from backend.domain import User, Blog, Comment

def test_init():
    user = User(0, "username", "passwd")
    blog = Blog(user)
    comment = Comment(user, blog)

    assert comment.post("arvidgimre", 4)