import datetime

class User: # Bob

    id # class attribute
    username = ""
    password = ""
    comments = []
    blogs = []

    def __init__ (self):
        pass

    def __init__(self, id: str, username, password): # constructor
        self.id = id # instance attribute
        self.username = username
        self.password = password

    def makeBlogPost(self, title, text): # instance method
        if not title or not text:
            return None
        blog = Blog(self)
        if blog in self.blogs:
            return None
        blog.post(title, text, [])
        self.blogs.append(blog)
        return blog
    
    def deleteBlogPost(self, blog):
        try:
            blog_index = self.blogs.index(blog)
        except ValueError:
            return
        del self.blogs[blog_index]

    def editBlogPost(self, blog, title, text):
        if self.username == blog.madeBy:
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
    
# region Getter and Setter methods
    def getUsername(self): # instance method
        return self.username
    
    def setUsername(self, username):
        self.username = username
    
    def getPassword(self):
        return self.password
    
    def setPassword(self, password):
        self.password = password
# endregion
    
class Blog:
    title = ""
    text = ""
    madeBy = ""
    publishedAt = datetime.datetime.now()
    lastEditedAt = None
    listOfComments = []

    def __init__(self, user):
        self.madeBy = user.username

# region Blog methods
    def post(self, title, text, comments):
        self.title = title
        self.text = text
        self.publishedAt = datetime.datetime.now()
        self.listOfComments = comments
    
    def Edit(self, title, text):
        self.title = title
        self.text = text
        self.lastEditedAt = datetime.datetime.now()
# endregion

# region Comment methods
    def addComment(self, comment):
        self.listOfComments.append(comment)
    
    def deleteComment(self, comment):
        try:
            comment_index = self.listOfComments.index(comment)
        except ValueError:
            return
        del self.listOfComments[comment_index]
# endregion

# region Overridden methods
    def __eq__(self, other):
        if not isinstance(other, Blog):
            return False
        return self.__hash__() == other.__hash__()

    def __hash__(self):
        return hash((self.title, self.madeBy))
    
    def __str__(self):
        return f"Blog(title='{self.title}', author={self.madeBy}, published={self.publishedAt.strftime('%Y-%m-%d')})"
# endregion

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
# region Comment methods
    def post(self, text, stars):
        self.text = text
        self.stars = stars
        self.publishedAt = datetime.datetime.now()

    def edit(self, text, stars):
        self.text = text
        self.stars = stars
        self.lastEditedAt = datetime.datetime.now()
# endregion