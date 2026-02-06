# The best blog ever

## domain model
Everyone has an ID
A User (class)
- username String (attribute)
- password String (attribute)
- Blogs List
- Comments List

A blog (class)
- title String
- text String
- madeBy User.class
- publishedAt Time
- lastEditedAt Time
- comments List of Comments

A comment (class)
- commenter User.class
- publishedAt Time
- stars Int
- text String
- blog Blog.class
- lastEditedAt Time



## UML diagram
[UML class diagram](/resources/uml.png) file.

### Made by Gard, Leander, Samuel
