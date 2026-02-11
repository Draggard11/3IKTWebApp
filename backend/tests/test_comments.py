from backend.domain import User, Blog, Comment

def test_init():
    user = User(0, "username", "passwd")
    blog = Blog(user)
    comment = Comment(user, blog)

    comment.post("Arvid Gimre.", 5)

    assert comment.text == "Arvid Gimre."
    assert comment.stars == 5