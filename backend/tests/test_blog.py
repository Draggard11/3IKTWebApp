from backend.domain import User, Blog, Comment

def test_init():
    user = User(0, "Bob", "pass123")
    blog = Blog(user)
    assert blog.madeBy == user

def test_post():
    user = User(0, "Bob", "pass123")
    blog = Blog(user)
    comment = Comment(user, blog)
    comment.post("Nice post!", 1)
    assert blog.post("Hello World", "more text", [comment, comment])

    assert blog.post("", "more text", [comment, comment]) == False # no text and title given
    assert blog.post(f"{'A ' * 50}", f"{'A ' * 1000}", [comment, comment]) == False # too long title
    assert blog.post(f"{'A ' * 1000}", f"{'A ' * 50}", [comment, comment]) == False # too long text

def test_edit():
    pass