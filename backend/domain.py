import datetime

class User:

    id # class attribute
    username = ""
    password = ""
    comments = []
    blogs = []

    def __init__ (self):
        pass

    def __init__(self, id, username, password): # constructor
        self.id = id # instance attribute
        self.username = username
        self.password = password

    def makeBlogPost(self, title, text): # instance method
        blog = Blog(self)
        blog.Post(title, text, [])
        self.blogs.append(blog)
        return blog
    
    def deleteBlogPost(self, blog):
        try:
            blog_index = self.blogs.index(blog)
        except ValueError:
            return
        del self.blogs[blog_index]

    def editBlogPost(self, blog, title, text):
        blog.edit(title, text)
    
    def makeComment(self, text, stars):
        pass

    def deleteComment(self, comment):
        pass

    def editComment(self, comment, text, stars):
        pass

    def getUsername(self): # instance method
        return self.username
    
    def setUsername(self, username):
        self.username = username
    
    def getPassword(self):
        return self.password
    
    def setPassword(self, password):
        self.password = password

class Blog:
    title = ""
    text = ""
    madeBy = ""
    publishedAt = datetime.datetime.now()
    lastEditedAt = datetime.datetime.now()
    listOfComments = []

    def __init__(self, user):
        self.madeBy = user.username

    def Post(self, title, text, comments):
        self.title = title
        self.text = text
        self.publishedAt = datetime.datetime.now()
        self.lastEditedAt = datetime.datetime.now()
        self.listOfComments = comments
    
    def edit(self, title, text):
        self.title = title
        self.text = text
        self.lastEditedAt = datetime.datetime.now()

    def __str__(self):
        return f"Blog(title='{self.title}', author={self.madeBy}, published={self.publishedAt.strftime('%Y-%m-%d')})"

class Comment:
    commenter = ""
    text = ""
    stars = 0
    publishedAt = datetime.datetime.now()

    def __init__(self, commenter):
        self.commenter = commenter
    
    def PostComment(self, text, stars):
        self.text = text
        self.stars = stars
        self.publishedAt = datetime.datetime.now()
