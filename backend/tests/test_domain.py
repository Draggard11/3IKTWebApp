from backend.domain import User, Blog, Comment

# Should test user functionality and scenarios
def test_user_make_blog_post(): # user functionality
    user = User(0, "bob", "pass123")
    blog = user.makeBlogPost("muldvarp", "content")
    assert isinstance(blog, Blog)
    assert blog in user.blogs
    assert user == blog.madeBy

def test_user_edit_blog_post(): # user functionality
    user = User(1, "dylan", "823y48723bv7yo4htuhrilhgdhwv4t3")
    blog = user.makeBlogPost("POTATO", "nggyunglydnlaadynmycngsgngtalahy")
    assert blog.title == "POTATO"
    assert blog.text == "nggyunglydnlaadynmycngsgngtalahy"
    user.editBlogPost(blog, "vietnam", "bạn có biết những con gà này có màu xanh lá cây phải không và cá thích uống bánh mì mỡi ngày ở Trung Quốc không vì phải không? Thật tốt.")
    assert blog.title == "vietnam"
    assert blog.text == "bạn có biết những con gà này có màu xanh lá cây phải không và cá thích uống bánh mì mỡi ngày ở Trung Quốc không vì phải không? Thật tốt."

def test_user_delete_blog_post(): # user functionality
    user = User(2, "arvid", "gimre")
    blog = user.makeBlogPost("Why you should vote for NHOKP® next election", "We make smoke detectors")
    user.deleteBlogPost(blog)
    assert blog not in user.blogs

def test_user_edit_and_delete_blog_post(): # user scenario
    user = User(3, "charlie", "mypassword")
    blog = user.makeBlogPost("Initial Title", "Initial Content")
    user.editBlogPost(blog, "Updated Title", "Updated Content")
    assert blog.title == "Updated Title"
    assert blog.text == "Updated Content"
    user.deleteBlogPost(blog)
    assert blog not in user.blogs

def test_user_make_comment(): # user functionality
    user1 = User(4, "Obama", "passwrod")
    user2 = User(5, "Frank", "IKEA")
    blog = user1.makeBlogPost("How To Install Mitsubishi Kazan Arctic 8000 Heat Pump", "Begin the installation by confirming the site meets all Mitsubishi requirements for clearance structural support electrical capacity and local code compliance. Securely mount the indoor unit on a wall or floor location that allows proper airflow. Place the outdoor unit on a level vibration isolated base with sufficient space for air intake and discharge. Next route the insulated refrigerant piping condensate drain and control wiring between the indoor and outdoor units. Seal all wall penetrations to prevent air and moisture intrusion. Evacuate the refrigerant lines with a vacuum pump to remove air and moisture then release the factory refrigerant charge according to the manufacturer specifications. Complete the installation by connecting the system to a dedicated properly sized power circuit with correct grounding. Perform pressure testing and leak checks restore power and configure controller settings. Commission the system by verifying airflow temperature performance defrost operation and confirming the system starts without errors then document the results and advise the owner on registration and routine maintenance.")
    comment = user2.makeComment('🤬', 1, blog)
    assert isinstance(comment, Comment)
    assert comment in user2.comments

def test_user_edit_comment(): # user functionality
    user1 = User(4, "Obama", "passwrod")
    user2 = User(5, "Frank", "IKEA")
    blog = user1.makeBlogPost("How To Install Mitsubishi Kazan Arctic 8000 Heat Pump", "Begin the installation by confirming the site meets all Mitsubishi requirements for clearance structural support electrical capacity and local code compliance. Securely mount the indoor unit on a wall or floor location that allows proper airflow. Place the outdoor unit on a level vibration isolated base with sufficient space for air intake and discharge. Next route the insulated refrigerant piping condensate drain and control wiring between the indoor and outdoor units. Seal all wall penetrations to prevent air and moisture intrusion. Evacuate the refrigerant lines with a vacuum pump to remove air and moisture then release the factory refrigerant charge according to the manufacturer specifications. Complete the installation by connecting the system to a dedicated properly sized power circuit with correct grounding. Perform pressure testing and leak checks restore power and configure controller settings. Commission the system by verifying airflow temperature performance defrost operation and confirming the system starts without errors then document the results and advise the owner on registration and routine maintenance.")
    comment = user2.makeComment('🤬', 1, blog)
    assert comment.text == '🤬'
    assert comment.stars == 1
    user2.editComment(comment, '😄', 5)
    assert comment.text == '😄'
    assert comment.stars == 5

def test_user_delete_comment(): # user functionality
    user1 = User(4, "Obama", "passwrod")
    user2 = User(5, "Frank", "IKEA")
    blog = user1.makeBlogPost("How To Install Mitsubishi Kazan Arctic 8000 Heat Pump", "Begin the installation by confirming the site meets all Mitsubishi requirements for clearance structural support electrical capacity and local code compliance. Securely mount the indoor unit on a wall or floor location that allows proper airflow. Place the outdoor unit on a level vibration isolated base with sufficient space for air intake and discharge. Next route the insulated refrigerant piping condensate drain and control wiring between the indoor and outdoor units. Seal all wall penetrations to prevent air and moisture intrusion. Evacuate the refrigerant lines with a vacuum pump to remove air and moisture then release the factory refrigerant charge according to the manufacturer specifications. Complete the installation by connecting the system to a dedicated properly sized power circuit with correct grounding. Perform pressure testing and leak checks restore power and configure controller settings. Commission the system by verifying airflow temperature performance defrost operation and confirming the system starts without errors then document the results and advise the owner on registration and routine maintenance.")
    comment = user2.makeComment('🤬', 1, blog)
    assert comment in user2.comments
    user2.deleteComment(comment, blog)
    assert comment not in user2.comments

def test_user_edit_and_delete_comment(): # user scenario
    user1 = User(4, "Obama", "passwrod")
    user2 = User(5, "Frank", "IKEA")
    blog = user1.makeBlogPost("How To Install Mitsubishi Kazan Arctic 8000 Heat Pump", "Begin the installation by confirming the site meets all Mitsubishi requirements for clearance structural support electrical capacity and local code compliance. Securely mount the indoor unit on a wall or floor location that allows proper airflow. Place the outdoor unit on a level vibration isolated base with sufficient space for air intake and discharge. Next route the insulated refrigerant piping condensate drain and control wiring between the indoor and outdoor units. Seal all wall penetrations to prevent air and moisture intrusion. Evacuate the refrigerant lines with a vacuum pump to remove air and moisture then release the factory refrigerant charge according to the manufacturer specifications. Complete the installation by connecting the system to a dedicated properly sized power circuit with correct grounding. Perform pressure testing and leak checks restore power and configure controller settings. Commission the system by verifying airflow temperature performance defrost operation and confirming the system starts without errors then document the results and advise the owner on registration and routine maintenance.")
    comment = user2.makeComment('🤬', 1, blog)
    assert comment.text == '🤬'
    assert comment.stars == 1
    user2.editComment(comment, '😄', 5)
    assert comment.text == '😄'
    assert comment.stars == 5
    assert user1.deleteComment(comment, blog)
    assert comment not in user2.comments

def test_user_cannot_edit_others_blog_post(): # user scenario
    user1 = User(6, "Alice", "alicepass")
    user2 = User(7, "Bob", "bobpass")
    blog = user1.makeBlogPost("Alice's Blog", "This is Alice's blog content.")
    original_title = blog.title
    original_text = blog.text
    user2.editBlogPost(blog, "Bob's Edit", "Bob tries to edit Alice's blog.")
    assert blog.title == original_title
    assert blog.text == original_text

def test_user_cannot_delete_others_blog_post(): # user scenario
    user1 = User(6, "Alice", "alicepass")
    user2 = User(7, "Bob", "bobpass")
    blog = user1.makeBlogPost("Alice's Blog", "This is Alice's blog content.")
    assert blog in user1.blogs
    user2.deleteBlogPost(blog)
    assert blog in user1.blogs

def test_user_cannot_edit_others_comment(): # user scenario
    user1 = User(8, "Charlie", "charliepass")
    user2 = User(9, "Dave", "davepass")
    blog = user1.makeBlogPost("Charlie's Blog", "This is Charlie's blog content.")
    comment = user2.makeComment("Nice blog!", 5, blog)
    original_text = comment.text
    original_stars = comment.stars
    user1.editComment(comment, "Edited by Charlie", 1)
    assert comment.text == original_text
    assert comment.stars == original_stars