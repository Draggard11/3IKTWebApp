import datetime
# region User class

class User: # Bob

    """
    Docstring for User

    Represents a user in the blogging system with capabilities to create, edit, and delete blog posts and comments.

    Attributes:
        id (str): Unique identifier for the user
        username (str): The user's username
        password (str): The user's password
        comments (list): List of comments made by the user
        blogs (list): List of blogs created by the user
    Methods:
        makeBlogPost(title, text): Create a new blog post
        deleteBlogPost(blog): Delete a blog post
        editBlogPost(blog, title, text): Edit a blog post
        makeComment(text, stars, blog): Create a new comment on a blog post
        deleteComment(comment, blog): Delete a comment
        editComment(comment, text, stars): Edit a comment
    """
    id # class attribute
    username = ""
    password = ""
    comments = []
    blogs = []

    def __init__(self, id: str, username, password):
        """Initialize a User with id, username, and password.
        
        Args:
            id (str): Unique identifier for the user
            username (str): The user's username
            password (str): The user's password
        """
        self.id = id
        self.username = username
        self.password = password

    def makeBlogPost(self, title, text):
        """Create a new blog post with the given title and text.
        
        Args:
            title (str): The title of the blog post
            text (str): The content of the blog post
            
        Returns:
            Blog: The created Blog object, or None if title or text is empty or blog already exists
        """
        if not title or not text:
            return None
        blog = Blog(self)
        if blog in self.blogs:
            return None
        blog.post(title, text, [])
        self.blogs.append(blog)
        return blog
    
    def deleteBlogPost(self, blog):
        """Delete a blog post from the user's blogs.
        
        Args:
            blog (Blog): The blog post to delete
        """
        try:
            blog_index = self.blogs.index(blog)
        except ValueError:
            return
        del self.blogs[blog_index]

    def editBlogPost(self, blog, title, text):
        """Edit a blog post if the user is the author.
        
        Args:
            blog (Blog): The blog post to edit
            title (str): The new title
            text (str): The new content
        """
        if self.username == blog.madeBy:
            blog.edit(title, text)
    
    def makeComment(self, text, stars, blog):
        """Create a new comment on a blog post.
        
        Args:
            text (str): The comment text
            stars (int): A rating in stars
            blog (Blog): The blog post being commented on
            
        Returns:
            Comment: The created Comment object
        """
        comment = Comment(self.username, self.blogs)
        comment.post(text, stars)
        self.comment.append(comment)
        blog.addComment(comment)
        return comment

    def deleteComment(self, comment, blog):
        """Delete a comment if the user is the blog author or comment author.
        
        Args:
            comment (Comment): The comment to delete
            blog (Blog): The blog containing the comment
        """
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
        """Edit a comment if the user is the comment author.
        
        Args:
            comment (Comment): The comment to edit
            text (str): The new comment text
            stars (int): The new rating
        """
        if self.username == comment.commenter:
            comment.edit(text, stars)
    
# region Getter and Setter methods
    def getUsername(self):
        """Get the user's username.
        
        Returns:
            str: The username
        """
        return self.username
    
    def setUsername(self, username):
        """Set the user's username.
        
        Args:
            username (str): The new username
        """
        self.username = username
    
    def getPassword(self):
        """Get the user's password.
        
        Returns:
            str: The password
        """
        return self.password
    
    def setPassword(self, password):
        """Set the user's password.
        
        Args:
            password (str): The new password
        """
        self.password = password
# endregion
# endregion

# region Blog class
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
    
    def edit(self, title, text):
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
# endregion

# region Comment class

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
# endregion