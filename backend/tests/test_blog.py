from backend.domain import User, Blog, Comment

def test_init():
    user = User("Bob", "pass123")
    blog = Blog(user)
    assert blog.madeBy == user

def test_user_make_blog_post():
    user = User("Bob", "pass123")
    # test fails when not in flask instance. refer to test_domain.py instead
    #blog = user.makeBlogPost("My First Blog", "This is the content of my first blog post.")
    #assert isinstance(blog, Blog)
    #assert blog in user.blogs
