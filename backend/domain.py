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
    
    def makeComment(self, text, stars, blog):
        comment = Comment(self.username, self.blogs)
        comment.post(text, stars)
        self.comment.append(comment)
        blog.addComment(comment)
        return comment

    def deleteComment(self, comment, blog):
        if self.username == blog.madeBy:
            blog.deleteComment(comment)
        if self.username == comment.commenter:
            try:
                comment_index = self.comments.index(blog)
            except ValueError:
                return
            del self.comments[comment_index]
            blog.deleteComment(comment)

    def editComment(self, comment, text, stars):
        if self.username == comment.commenter:
            comment.edit(text, stars)

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
    
    def Edit(self, title, text):
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
    blog = ""
    lastEditedAt = None

    def __init__(self, commenter, blog):
        self.commenter = commenter
        self.blog = blog
    
    def post(self, text, stars):
        self.text = text
        self.stars = stars
        self.publishedAt = datetime.datetime.now()

    def edit(self, text, stars):
        self.text = text
        self.stars = stars
        self.lastEditedAt = datetime.datetime.now()