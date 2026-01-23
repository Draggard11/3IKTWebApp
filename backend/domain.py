class User:

    id
    username = ""
    password = ""

    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

    def getUsername(self):
        return  self.username
    
    def setUsername(self, username):
        self.username = username

    def setPassword(self, password):
        self.password = password

class Blog:
    
    def __init__(self):
        pass

    def Post(self, title, madeBy, publishedAt, comments):
        self.title = title
        self.

class Comment:

    def __init__(self):
        pass










#Bạn có biết những con gà này không có màu xanh lá cây và hôm này con không ăn bánh mì cho bữa sáng phải không?