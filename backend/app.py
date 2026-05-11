import os
from datetime import timedelta
from operator import is_none

from domain import Blog, Comment, User, db
from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    current_user,
    get_jwt_identity,
    jwt_required,
    set_access_cookies,
    unset_jwt_cookies,
)
from flask_restful import Api, Resource
from sqlalchemy.orm import joinedload

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
CORS(app, supports_credentials=True)
# configure the SQLite database, relative to the app instance folder
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
app.config["JWT_COOKIE_CSRF_PROTECT"] = False
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_VERIFY_SUB"] = False
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
    basedir, "project.db"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# app.config["JWT_COOKIE_SAMESITE"] = "Lax"
app.config["JWT_COOKIE_SECURE"] = False  # True in production with HTTPS

# initialize the app with the extension
db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
api = Api(app)

with app.app_context():
    # db.drop_all()
    db.create_all()

    # Initial User Setup for testing
    if not db.session.query(User).filter_by(username="bob").first():
        user = User("bob", bcrypt.generate_password_hash("pass123").decode("utf-8"))
        blog = user.makeBlogPost(
            "My First Blog",
            "Khi một người đàn ông uống cà phê sau khi con ếch thấy nước Phần Lan, đừng hỏi người nông dân để ngồi ở giữa những nhà của mình.",
        )
        comment = user.makeComment("My first comment", 5, blog)
        db.session.add(user)
        db.session.add(blog)
        db.session.add(comment)
        db.session.commit()


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()


@app.route("/api/blogs", methods=["GET"])
def getBlogs():
    try:
        page = int(request.args.get("page", 1))
        limit = int(request.args.get("limit", 5))

        offset = (page - 1) * limit  # ✅ FIXED

        blogs = Blog.query.order_by(Blog.id.desc()).offset(offset).limit(limit).all()

        return jsonify([blog.toDict() for blog in blogs])  # ✅ serialize properly

    except ValueError:
        return jsonify({"error": "Invalid page or limit parameter"}), 400


@app.route("/api/blog/<int:id>", methods=["GET"])
def getBlog(id):
    blog = db.session.get(
        Blog,
        id,
        options=[
            joinedload(Blog.madeBy),
            joinedload(Blog.comments).joinedload(Comment.commenter),
        ],
    )
    if blog is None:
        return jsonify({"error": "Blog not found"}), 404
    return jsonify(blog.toDict())


@app.route("/api/blog", methods=["POST"])
@jwt_required()
def postBlog():
    data = request.get_json()
    if is_none(data):
        return jsonify({"error": "Invalid JSON data"}), 400
        # maybe make it possible for anonymous posts
    madeBy = current_user
    title = data["title"]
    text = data["text"]
    if not isinstance(madeBy, User):
        return jsonify({"error": "Not logged in"}), 400
    blog = madeBy.makeBlogPost(title, text)
    if is_none(blog):
        return jsonify({"error": "Invalid blog data"}), 400
    db.session.add(blog)
    db.session.commit()
    return jsonify(blog.toDict()), 200


# https://flask-sqlalchemy.readthedocs.io/en/stable/quickstart/


@app.route("/api/user", methods=["GET"])
@jwt_required()
def getMyUsername():
    return jsonify(username=current_user.username)


@app.route("/api/register", methods=["POST"])
def register_user():
    data = request.get_json()
    # check that username and password exists
    if data is None or "username" not in data or "password" not in data:
        return jsonify(
            {"error": "Invalid JSON data. Requires username and password."}
        ), 400
    username = data["username"]
    password = data["password"]

    if db.session.query(User).filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 409

    try:
        nps = __savePassword(password)
        user = User(username, nps)
        db.session.add(user)
        db.session.commit()
    except:
        return jsonify({"error": "failed to update database"}), 400
    return jsonify({"username": user.username}), 201


@app.route("/api/login", methods=["POST"])
def login_user():  # Does when you click login button
    data = request.get_json()
    if data == None:
        return jsonify({"error": "Invalid JSON data"}), 400

    username = data["username"]
    password = data["password"]

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user = db.session.query(User).filter_by(username=username).first()

    if not user:
        return jsonify({"error": "User not registered"}), 400

    if __checkPassword(password, user.password):
        access_token = create_access_token(identity=user)
        response = jsonify(username=username)
        set_access_cookies(response, access_token)  # ✅ sets JWT as a cookie
        return response, 200

    else:
        return jsonify({"msg": "Invalid credentials"})

    # user = db.one_or_404(db.select(User).filter_by(username=username))


@app.route("/api/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "Logged out"})
    try:
        unset_jwt_cookies(response)
    except ValueError:
        return (jsonify({"error": "Logging out did not work"}),)
    return response, 200


@app.route("/api/blog/<int:id>/comment", methods=["POST"])
@jwt_required()
def make_comment(id):  # Does when you click create comment button
    data = request.get_json()
    if is_none(data):
        return jsonify({"error": "Invalid JSON data"}), 400
        # maybe make it possible for anonymous posts
    commenter = current_user
    text = data["text"]
    stars = data["stars"]
    blog = db.get_or_404(Blog, id)
    if not isinstance(commenter, User):
        return jsonify({"error": "Not logged in"}), 400
    comment = commenter.makeComment(text, stars, blog)
    if is_none(comment):
        return jsonify({"error": "Invalid comment data"}), 400
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.toDict()), 200


# region Private methods
# does not work


def __savePassword(password: str):
    return bcrypt.generate_password_hash(password).decode("utf-8")


def __checkPassword(password: str, hashed_password: str) -> bool:
    return bcrypt.check_password_hash(hashed_password, password)


# endregion


def main():
    app.run(host="0.0.0.0", port=5000)


if __name__ == "__main__":
    main()
