from backend.domain import User, Blog, Comment

def test_init():
    user = User(0, "Bob", "pass123")
    blog = Blog(user)
    assert blog.madeBy == user

def test_user_make_blog_post():
    user = User(0, "Bob", "pass123")
    blog = user.makeBlogPost("My First Blog", "This is the content of my first blog post.")
    assert isinstance(blog, Blog)
    assert blog in user.blogs