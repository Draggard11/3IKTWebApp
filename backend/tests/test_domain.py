from backend.domain import User, Blog, Comment, db

import unittest

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from flask import Flask

class test_domain(unittest.TestCase):

    def setUp(self):
            # create app and configure in-memory DB
            self.app = Flask(__name__)
            self.app.config.update({
                'TESTING': True,
                'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:',
                'SQLALCHEMY_TRACK_MODIFICATIONS': False,
            })
    
            # initialize DB with this app and push context
            db.init_app(self.app)
            self.app_context = self.app.app_context()
            self.app_context.push()
    
            # create tables and get session
            db.create_all()
            self.session = db.session
    
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()
    
    # Should test user functionality and scenarios
    def test_user_make_blog_post(self): # user functionality
        user = User("bob", "pass123")
        blog = user.makeBlogPost("muldvarp", "content")
        self.session.add(user)
        self.session.commit()
        assert user.id == 1 # test for id
        assert isinstance(blog, Blog)
        assert blog in user.blogs
        assert user == blog.madeBy
        user2 = User("Alice", "pass123")
        self.session.add(user2)
        self.session.commit()
        assert user2.id == 2 # test for id again

    def test_user_edit_blog_post(self): # user functionality
        user = User("dylan", "823y48723bv7yo4htuhrilhgdhwv4t3")
        blog = user.makeBlogPost("POTATO", "nggyunglydnlaadynmycngsgngtalahy")
        assert blog
        assert blog.title == "POTATO"
        assert blog.text == "nggyunglydnlaadynmycngsgngtalahy"
        user.editBlogPost(blog, "vietnam", "bạn có biết những con gà này có màu xanh lá cây phải không và cá thích uống bánh mì mỡi ngày ở Trung Quốc không vì phải không? Thật tốt.")
        assert blog.title == "vietnam"
        assert blog.text == "bạn có biết những con gà này có màu xanh lá cây phải không và cá thích uống bánh mì mỡi ngày ở Trung Quốc không vì phải không? Thật tốt."

    def test_user_delete_blog_post(self): # user functionality
        user = User("arvid", "gimre")
        blog = user.makeBlogPost("Why you should vote for NHOKP® next election", "We make smoke detectors")
        assert blog
        self.session.add(user)
        self.session.add(blog)
        self.session.commit()
        assert user.deleteBlogPost(blog) # deletes blog
        self.session.commit()
        assert blog not in user.blogs # should not be in the list anymore 

    def test_user_edit_and_delete_blog_post(self): # user scenario
        user = User("charlie", "mypassword")
        blog = user.makeBlogPost("Initial Title", "Initial Content")
        assert blog
        user.editBlogPost(blog, "Updated Title", "Updated Content")
        self.session.add(user)
        self.session.add(blog)
        self.session.commit()
        assert blog.title == "Updated Title"
        assert blog.text == "Updated Content"
        assert user.deleteBlogPost(blog)
        self.session.commit()
        assert blog not in user.blogs

    def test_user_make_comment(self): # user functionality
        user1 = User("Obama", "passwrod")
        user2 = User("Frank", "IKEA")
        blog = user1.makeBlogPost("How To Install Mitsubishi Kazan Arctic 8000 Heat Pump", "Begin the installation by confirming the site meets all Mitsubishi requirements for clearance structural support electrical capacity and local code compliance. Securely mount the indoor unit on a wall or floor location that allows proper airflow. Place the outdoor unit on a level vibration isolated base with sufficient space for air intake and discharge. Next route the insulated refrigerant piping condensate drain and control wiring between the indoor and outdoor units. Seal all wall penetrations to prevent air and moisture intrusion. Evacuate the refrigerant lines with a vacuum pump to remove air and moisture then release the factory refrigerant charge according to the manufacturer specifications. Complete the installation by connecting the system to a dedicated properly sized power circuit with correct grounding. Perform pressure testing and leak checks restore power and configure controller settings. Commission the system by verifying airflow temperature performance defrost operation and confirming the system starts without errors then document the results and advise the owner on registration and routine maintenance.")
        assert blog
        comment = user2.makeComment('🤬', 1, blog)
        assert isinstance(comment, Comment)
        assert comment in user2.comments

    def test_user_edit_comment(self): # user functionality
        user1 = User("Obama", "passwrod")
        user2 = User("Frank", "IKEA")
        blog = user1.makeBlogPost("How To Install Mitsubishi Kazan Arctic 8000 Heat Pump", "Begin the installation by confirming the site meets all Mitsubishi requirements for clearance structural support electrical capacity and local code compliance. Securely mount the indoor unit on a wall or floor location that allows proper airflow. Place the outdoor unit on a level vibration isolated base with sufficient space for air intake and discharge. Next route the insulated refrigerant piping condensate drain and control wiring between the indoor and outdoor units. Seal all wall penetrations to prevent air and moisture intrusion. Evacuate the refrigerant lines with a vacuum pump to remove air and moisture then release the factory refrigerant charge according to the manufacturer specifications. Complete the installation by connecting the system to a dedicated properly sized power circuit with correct grounding. Perform pressure testing and leak checks restore power and configure controller settings. Commission the system by verifying airflow temperature performance defrost operation and confirming the system starts without errors then document the results and advise the owner on registration and routine maintenance.")
        assert blog
        comment = user2.makeComment('🤬', 1, blog)
        assert comment
        assert comment.text == '🤬'
        assert comment.stars == 1
        user2.editComment(comment, '😄', 5)
        assert comment.text == '😄'
        assert comment.stars == 5

    def test_user_delete_comment(self): # user functionality
        user1 = User("Obama", "passwrod")
        user2 = User("Frank", "IKEA")
        blog = user1.makeBlogPost("How To Install Mitsubishi Kazan Arctic 8000 Heat Pump", "Begin the installation by confirming the site meets all Mitsubishi requirements for clearance structural support electrical capacity and local code compliance. Securely mount the indoor unit on a wall or floor location that allows proper airflow. Place the outdoor unit on a level vibration isolated base with sufficient space for air intake and discharge. Next route the insulated refrigerant piping condensate drain and control wiring between the indoor and outdoor units. Seal all wall penetrations to prevent air and moisture intrusion. Evacuate the refrigerant lines with a vacuum pump to remove air and moisture then release the factory refrigerant charge according to the manufacturer specifications. Complete the installation by connecting the system to a dedicated properly sized power circuit with correct grounding. Perform pressure testing and leak checks restore power and configure controller settings. Commission the system by verifying airflow temperature performance defrost operation and confirming the system starts without errors then document the results and advise the owner on registration and routine maintenance.")
        assert blog
        comment = user2.makeComment('🤬', 1, blog)
        self.session.add(user1)
        self.session.add(user2)
        self.session.add(blog)
        self.session.add(comment)
        self.session.commit()
        assert comment in user2.comments
        user2.deleteComment(comment, blog)
        self.session.commit()
        assert comment not in user2.comments

    def test_user_edit_and_delete_comment(self): # user scenario
        user1 = User("Obama", "passwrod")
        user2 = User("Frank", "IKEA")
        blog = user1.makeBlogPost("How To Install Mitsubishi Kazan Arctic 8000 Heat Pump", "Begin the installation by confirming the site meets all Mitsubishi requirements for clearance structural support electrical capacity and local code compliance. Securely mount the indoor unit on a wall or floor location that allows proper airflow. Place the outdoor unit on a level vibration isolated base with sufficient space for air intake and discharge. Next route the insulated refrigerant piping condensate drain and control wiring between the indoor and outdoor units. Seal all wall penetrations to prevent air and moisture intrusion. Evacuate the refrigerant lines with a vacuum pump to remove air and moisture then release the factory refrigerant charge according to the manufacturer specifications. Complete the installation by connecting the system to a dedicated properly sized power circuit with correct grounding. Perform pressure testing and leak checks restore power and configure controller settings. Commission the system by verifying airflow temperature performance defrost operation and confirming the system starts without errors then document the results and advise the owner on registration and routine maintenance.")
        assert blog
        comment = user2.makeComment('🤬', 1, blog)
        assert comment
        self.session.add(user1)
        self.session.add(user2)
        self.session.add(blog)
        self.session.add(comment)
        self.session.commit()
        assert comment.text == '🤬'
        assert comment.stars == 1
        user2.editComment(comment, '😄', 5)
        assert comment.text == '😄'
        assert comment.stars == 5
        assert user1.deleteComment(comment, blog)
        self.session.commit()
        assert comment not in user2.comments

    def test_user_cannot_edit_others_blog_post(self): # user scenario
        user1 = User("Alice", "alicepass")
        user2 = User("Bob", "bobpass")
        blog = user1.makeBlogPost("Alice's Blog", "This is Alice's blog content.")
        assert blog
        original_title = blog.title
        original_text = blog.text
        user2.editBlogPost(blog, "Bob's Edit", "Bob tries to edit Alice's blog.")
        assert blog.title == original_title
        assert blog.text == original_text

    def test_user_cannot_delete_others_blog_post(self): # user scenario
        user1 = User("Alice", "alicepass")
        user2 = User("Bob", "bobpass")
        blog = user1.makeBlogPost("Alice's Blog", "This is Alice's blog content.")
        assert blog
        assert blog in user1.blogs
        user2.deleteBlogPost(blog)
        self.session.commit()
        assert blog in user1.blogs

    def test_user_cannot_edit_others_comment(self): # user scenario
        user1 = User("Charlie", "charliepass")
        user2 = User("Dave", "davepass")
        blog = user1.makeBlogPost("Charlie's Blog", "This is Charlie's blog content.")
        assert blog
        comment = user2.makeComment("Nice blog!", 5, blog)
        assert comment
        original_text = comment.text
        original_stars = comment.stars
        user1.editComment(comment, "Edited by Charlie", 1)
        assert comment.text == original_text
        assert comment.stars == original_stars
