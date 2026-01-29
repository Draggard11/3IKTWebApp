from backend.domain import User, Blog, Comment

# Should test user functionality and scenarios
def test_user_make_blog_post(): # user functionality
    user = User(0, "bob", "pass123")
    blog = user.makeBlogPost("muldvarp", "content")
    assert isinstance(blog, Blog)
    assert blog in user.blogs
    assert user.getUsername() == blog.madeBy

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
    assert user2.makeComment('🤬', 1, blog)

def test_user_edit_comment(): # user functionality
    user1 = User(4, "Obama", "passwrod")
    user2 = User(5, "Frank", "IKEA")
    blog = user1.makeBlogPost("How To Install Mitsubishi Kazan Arctic 8000 Heat Pump", "Begin the installation by confirming the site meets all Mitsubishi requirements for clearance structural support electrical capacity and local code compliance. Securely mount the indoor unit on a wall or floor location that allows proper airflow. Place the outdoor unit on a level vibration isolated base with sufficient space for air intake and discharge. Next route the insulated refrigerant piping condensate drain and control wiring between the indoor and outdoor units. Seal all wall penetrations to prevent air and moisture intrusion. Evacuate the refrigerant lines with a vacuum pump to remove air and moisture then release the factory refrigerant charge according to the manufacturer specifications. Complete the installation by connecting the system to a dedicated properly sized power circuit with correct grounding. Perform pressure testing and leak checks restore power and configure controller settings. Commission the system by verifying airflow temperature performance defrost operation and confirming the system starts without errors then document the results and advise the owner on registration and routine maintenance.")
    comment = user2.makeComment('🤬', 1, blog)
    assert user2.editComment(comment, '😄', 5)

def test_user_delete_comment(): # user functionality
    user1 = User(4, "Obama", "passwrod")
    user2 = User(5, "Frank", "IKEA")
    blog = user1.makeBlogPost("How To Install Mitsubishi Kazan Arctic 8000 Heat Pump", "Begin the installation by confirming the site meets all Mitsubishi requirements for clearance structural support electrical capacity and local code compliance. Securely mount the indoor unit on a wall or floor location that allows proper airflow. Place the outdoor unit on a level vibration isolated base with sufficient space for air intake and discharge. Next route the insulated refrigerant piping condensate drain and control wiring between the indoor and outdoor units. Seal all wall penetrations to prevent air and moisture intrusion. Evacuate the refrigerant lines with a vacuum pump to remove air and moisture then release the factory refrigerant charge according to the manufacturer specifications. Complete the installation by connecting the system to a dedicated properly sized power circuit with correct grounding. Perform pressure testing and leak checks restore power and configure controller settings. Commission the system by verifying airflow temperature performance defrost operation and confirming the system starts without errors then document the results and advise the owner on registration and routine maintenance.")
    comment = user2.makeComment('🤬', 1, blog)
    assert user2.deleteComment(comment, blog)

def test_user_edit_and_delete_comment(): # user scenario
    user1 = User(4, "Obama", "passwrod")
    user2 = User(5, "Frank", "IKEA")
    blog = user1.makeBlogPost("How To Install Mitsubishi Kazan Arctic 8000 Heat Pump", "Begin the installation by confirming the site meets all Mitsubishi requirements for clearance structural support electrical capacity and local code compliance. Securely mount the indoor unit on a wall or floor location that allows proper airflow. Place the outdoor unit on a level vibration isolated base with sufficient space for air intake and discharge. Next route the insulated refrigerant piping condensate drain and control wiring between the indoor and outdoor units. Seal all wall penetrations to prevent air and moisture intrusion. Evacuate the refrigerant lines with a vacuum pump to remove air and moisture then release the factory refrigerant charge according to the manufacturer specifications. Complete the installation by connecting the system to a dedicated properly sized power circuit with correct grounding. Perform pressure testing and leak checks restore power and configure controller settings. Commission the system by verifying airflow temperature performance defrost operation and confirming the system starts without errors then document the results and advise the owner on registration and routine maintenance.")
    comment = user2.makeComment('🤬', 1, blog)
    assert user2.editComment(comment, '😄', 5)
    assert user2.deleteComment(comment, blog)