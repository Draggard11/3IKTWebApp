from domain import User, Blog, Comment
from flask import Flask
from flask_restful import Resource, Api
import bcrypt

app = Flask(__name__)
api = Api(app)

def register_user(id, username, password): # Does when you click register button
    return User(id, username, password)

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