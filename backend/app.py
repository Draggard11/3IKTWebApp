from domain import User, Blog, Comment

def register_user(id, username, password): # Does when you click register button
    return User(id, username, password)

def login_user(username, password): # Does when you click login button
    pass

def make_blog_post(user, title, text): # Does when you click create blog post button
    pass

def make_comment(user, blog, text, stars): # Does when you click create comment button
    pass

def main():
    print("Hello World!")
    user1 = User(0, "Dragg", "password123")
    print(user1.getUsername())
    user1.setUsername("DragonMaster")
    print(user1.getUsername())
    blog1 = user1.makeBlogPost("My first blog", "This is the content of my first blog post.")
    print(blog1.__str__())

if __name__ == "__main__":
    main()