from domain import User, Blog, Comment, db
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager, set_access_cookies, current_user, unset_jwt_cookies
import os
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)
# configure the SQLite database, relative to the app instance folder
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
app.config["JWT_COOKIE_CSRF_PROTECT"] = True
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_VERIFY_SUB"] = False
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'project.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# app.config["JWT_COOKIE_SAMESITE"] = "Lax"
app.config["JWT_COOKIE_SECURE"] = False  # True in production with HTTPS

# initialize the app with the extension
db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
api = Api(app)

with app.app_context():
    db.drop_all()
    db.create_all()

    # Initial User Setup for testing
    if not db.session.query(User).filter_by(username='bob').first():
        user = User('bob', bcrypt.generate_password_hash(
            "pass123").decode('utf-8'))
        blog = user.makeBlogPost(
            "My First Blog", "This is the content of my first blog post.")
        db.session.add(user)
        db.session.add(blog)
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
    # SELECT * FROM BLOG
    # fra nederste rad til topp i forhold til hvilke blog som skal komme først
    return jsonify(Blog.query.all())

@app.route("/api/blog/<int:id>", methods=["GET"])
def getBlog(id):
    return jsonify(db.get(Blog, id))

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
        return jsonify({"error": "Invalid JSON data. Requires username and password."}), 400
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
    unset_jwt_cookies(response)
    return response, 200


@jwt_required
def make_blog_post(user, title, text):  # Does when you click create blog post button
    pass


@app.route("/api/blog/<int:id>/comment", methods=["POST"])
@jwt_required()
def make_comment(id):  # Does when you click create comment button
    data = request.get_json()
    if data == None:
        return jsonify({"error": "Invalid JSON data"}), 400
    try:
        # maybe make it possible for anonymous posts
        commenter = current_user
        text = data["text"]
        stars = data["stars"]
        blog = db.get_or_404(Blog, id)
        comment = Comment(commenter, blog)
        comment.post(text, stars)
        db.session.add(comment)
        db.session.commit()
        return jsonify({"text": text, "stars": stars}), 200
    except:
        return jsonify({"error": "errored"}), 400

# region Private methods
# does not work


def __savePassword(password: str):
    return bcrypt.generate_password_hash(password).decode('utf-8')


def __checkPassword(password: str, hashed_password: str) -> bool:
    return bcrypt.check_password_hash(hashed_password, password)

# endregion


def main():
    app.run()


if __name__ == "__main__":
    main()
