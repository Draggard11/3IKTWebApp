from domain import User, Blog, Comment

# Should test user functionality and scenarios
def test_user_make_blog_post(): # user functionality
    user = User(0, "bob", "pass123")
    blog = user.makeBlogPost("muldvarp", "content")
    assert isinstance(Blog, blog)
    assert blog in user.blogs
    assert user.getUsername() == blog.madeBy
def test_user_edit_blog_post(): # user functionality
    #TODO: implement test
    pass 
def test_user_delete_blog_post(): # user functionality
    #TODO: implement test
    pass
def test_user_edit_and_delete_blog_post(): # user scenario
    user = User(2, "charlie", "mypassword")
    blog = user.makeBlogPost("Initial Title", "Initial Content")
    user.editBlogPost(blog, "Updated Title", "Updated Content")
    assert blog.title == "Updated Title"
    assert blog.text == "Updated Content"
    user.deleteBlogPost(blog)
    assert blog not in user.blogs

def test_user_make_comment(): # user functionality
    #TODO: implement test
    pass

def test_user_edit_comment(): # user functionality
    #TODO: implement test
    pass

def test_user_delete_comment(): # user functionality
    #TODO: implement test
    pass

def test_user_edit_and_delete_comment(): # user scenario
    #TODO: implement test
    pass