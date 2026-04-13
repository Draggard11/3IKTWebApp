from domain import User, Blog, Comment, db
from flask import Flask, jsonify, request
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
        print(username)
        password = data["password"]
        print(password)
        # check if username already exists, does not work as well
        if (db.session.execute(db.select(User).filter_by(username=username)).scalar_one_or_none() != None):
            # just login the user instead of returning an error
            return jsonify({"redirect", "/api/login"}), 300
        print(username)
        user = User(username, password)
        print(user.username)
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

    user = db.one_or_404(db.select(User).filter_by(username=username))
    pass

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