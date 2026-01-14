class User:

    id
    username = ""

    def __init__(self, id, username):
        self.id = id
        self.username = username

    def getUsername(self):
        return  self.username
    
    def setUsername(self, username):
        self.username = username

class Blog:
    
    def __init__(self):
        pass

class Comment:

    def __init__(self):
        pass