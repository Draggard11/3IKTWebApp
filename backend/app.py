from domain import User, Blog, Comment, db
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
# initialize the app with the extension
db.init_app(app)
bcrypt = Bcrypt(app)
api = Api(app)

with app.app_context():
    db.create_all()
    db.drop_all()
    db.create_all()

    user = User("bob", bcrypt.generate_password_hash("pass123").decode('utf-8'))
    blog = user.makeBlogPost("My First Blog", "This is the content of my first blog post.")

    db.session.add(user)
    db.session.add(blog)
    db.session.commit()

@app.route("/api/blogs", methods=["GET"])
def getBlogs():
    # SELECT * FROM BLOG
    # fra nederste rad til topp i forhold til hvilke blog som skal komme først
    return jsonify(Blog.query.all())

@app.route("/api/blog/<int:blogid>/comment/<int:id>", methods=["GET"])
def getComment(blogid, id):
    # SELECT * FROM BLOG
    # fra nederste rad til topp i forhold til hvilke blog som skal komme først
    return jsonify(Blog.query.all())

@app.route("/api/blog/<int:id>", methods=["GET"])
def getBlog(id):
    return jsonify(db.get(Blog, id))

# https://flask-sqlalchemy.readthedocs.io/en/stable/quickstart/ 
@app.route("/api/user/<int:id>", methods=["GET"])
def getUsername(id):
    user = db.get_or_404(User, id)
    return jsonify({"username": user.username})

@app.route("/api/register", methods=["POST"])
def register_user():
    data = request.get_json()
    if data == None:
        return jsonify({"error": "Invalid JSON data"}), 400
    try:
        username = data["username"]
        password = data["password"]
        nps = __savePassword(password)
        # check if username already exists, does not work as well
        user = User(username,password)
        db.session.add(user)
        db.session.commit()
        # resp = make_response('Setting the cookie') 
        # resp.set_cookie('id', user.id)
    except:
        return jsonify({"error": "failed to update database"}), 400
    # add cookies
    
    return jsonify({"username": user.username}), 201

@app.route("/api/login", methods=["POST"])
def login_user(): # Does when you click login button
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
        return jsonify({"login": "Login successful"}), 200

    else:
        return jsonify({"msg": "Invalid credentials"})

    # user = db.one_or_404(db.select(User).filter_by(username=username))

def make_blog_post(user, title, text): # Does when you click create blog post button
    pass

@app.route("/api/blog/<int:id>/comment", methods=["POST"])
def make_comment(id): # Does when you click create comment button
    data = request.get_json()
    if data == None:
        return jsonify({"error": "Invalid JSON data"}), 400
    try:
        # maybe make it possible for anonymous posts
        commenter = db.get_or_404(User, 1)
        text = data["text"]
        stars = data["stars"]
        blog = db.get_or_404(Blog, 1)
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