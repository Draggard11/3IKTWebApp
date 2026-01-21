from domain import User, Blog, Comment

def register_user(id, username, password):
    pass

def login_user(username, password):
    pass

def logout_user(user):
    pass

def make_blog_post(user, title, text):
    pass

def make_comment(user, blog, text, stars):
    pass

def main():
    print("Hello World!")
    user1 = User(0, "Dragg", "password123")
    print(user1.getUsername())
    user1.setUsername("DragonMaster")
    print(user1.getUsername())
    blog1 = user1.makeBlogPost("My first blog", "This is the content of my first blog post.")
    print(f"Blog Title: {blog1.title}, Made By: {blog1.madeBy}")

if __name__ == "__main__":
    main()