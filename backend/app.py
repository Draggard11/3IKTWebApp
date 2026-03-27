from domain import User, Blog, Comment, db
from flask import Flask, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
import bcrypt

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
# initialize the app with the extension
db.init_app(app)
api = Api(app)

with app.app_context():
    db.create_all()
    db.drop_all()
    db.create_all()

    user = User("bob", "pass123")

    db.session.add(user)
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

@app.route("/register", methods=["POST"])
def register_user():
    return "User(username, password)"

def login_user(username, password): # Does when you click login button
    pass

def make_blog_post(user, title, text): # Does when you click create blog post button
    pass

def make_comment(user, blog, text, stars): # Does when you click create comment button
    pass

# region Private methods

def __savePassword(self, password: str) -> str:
    return bcrypt.hashpw(password, bcrypt.gensalt())

def __checkPassword(self, password: str) -> bool:
    if bcrypt.checkpw(password, self.password):
        return True
    return False

# endregion

def main():
    app.run()
    

if __name__ == "__main__":
    main()