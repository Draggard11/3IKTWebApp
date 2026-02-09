from backend.domain import User, Blog, Comment

def test_init():
    user = User(0, "Bob", "pass123")
    blog = Blog(user)

def test_post():