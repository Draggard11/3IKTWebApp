from backend.domain import User, Blog, Comment

def test_init():
    user = User(0, "username", "passwd")
    blog = Blog(user)
    comment = Comment(user, blog)
    assert comment.commenter == user
    assert comment.blog == blog
    

def test_post():
    user = User(0, "username", "passwd")
    blog = Blog(user)
    comment = Comment(user, blog)

    #check for stars upper and lower bound
    for i in [1,2,3,4,5]:
        assert comment.post("...", i)
    assert not comment.post("...", -1)
    assert not comment.post("...", 0)
    assert not comment.post("...", 6)

    # check for comment text upper and lower bound
    assert not comment.post("", 1)
    assert comment.post("A" * 50, 1)
    assert not comment.post("A" * 51, 1)

    

def test_edit():
    pass