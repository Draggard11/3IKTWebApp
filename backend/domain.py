class User:

    id # class attribute
    username = ""
    password = ""

    def __init__ (self):
        pass

    def __init__(self, id, username, password): # constructor
        self.id = id # instance attribute
        self.username = username
        self.password = password

    def makeBlogPost(self, title, text): # instance method
        return Blog(title, text, self)

    def getUsername(self): # instance method
        return self.username
    
    def setUsername(self, username):
        self.username = username

class Blog:
    title = ""
    text = ""
    madeBy = ""
    publishedAt = 0

    def __init__(self, title, text, user):
        self.title = title
        self.text = text
        self.madeBy = user.username

class Comment:
    commenter = ""
    text = ""
    stars = 0
    publishedAt = 0

    def __init__(self, commenter, text, stars):
        self.commenter = commenter
        self.text = text
        self.stars = stars
