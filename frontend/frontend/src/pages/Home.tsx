import React from "react";
import { useEffect, useState } from "react";
import '../styles/Home.css';

const Blogs = () => {
  
  const [allblogs, setAllblogs] = useState<any[]>([]);
  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const response = await fetch('http://127.0.0.1:5000');
  //       const data = await response.json();
  //       console.log(`Response's response: ${response}`);
  //       setAllblogs(data);
  //     }
  //     catch (error) {
  //       console.error('Error when fetching blogs: ', error);
  //     }
  //   }; fetchBlogs();
  // }, []);

  const mockBlogs = [
    { id: 1, title: 'Getting Started with React', text: 'React is a powerful library for building user interfaces. Learn the basics today!', madeBy: 'Alice', comments: [{commenter: 'john', text: 'Great intro!', stars: 5}, {commenter: 'jane', text: 'Very helpful', stars: 4}]},
    { id: 2, title: 'TypeScript Best Practices', text: 'Master TypeScript with these essential tips and tricks for better code quality.', madeBy: 'Bob', comments: [{commenter: 'dev1', text: 'Excellent guide', stars: 5}]},
    { id: 3, title: 'Understanding Hooks', text: 'Dive deep into React Hooks and learn how to manage state effectively.', madeBy: 'Charlie', comments: [{commenter: 'coder', text: 'Cleared up my confusion', stars: 4}, {commenter: 'dev2', text: 'Perfect explanation', stars: 5}]},
    { id: 4, title: 'CSS Grid Layout Guide', text: 'Build responsive layouts with CSS Grid - the modern way to design web pages.', madeBy: 'Diana', comments: [{commenter: 'designer', text: 'Changed my workflow', stars: 5}]},
    { id: 5, title: 'JavaScript Async/Await', text: 'Master asynchronous programming with async/await patterns and error handling.', madeBy: 'Eve', comments: [{commenter: 'backend', text: 'Exactly what I needed', stars: 4}]},
    { id: 6, title: 'Web Performance Tips', text: 'Optimize your website for speed with these proven performance techniques.', madeBy: 'Frank', comments: [{commenter: 'user1', text: 'Saw 50% improvement', stars: 5}]},
    { id: 7, title: 'REST API Design', text: 'Learn the principles of designing clean and efficient REST APIs.', madeBy: 'Grace', comments: [{commenter: 'architect', text: 'Best practices clarified', stars: 5}]},
    { id: 8, title: 'Introduction to Docker', text: 'Containerize your applications and streamline your deployment process.', madeBy: 'Henry', comments: [{commenter: 'devops', text: 'Game changer', stars: 5}, {commenter: 'user2', text: 'Finally understand Docker', stars: 4}]},
    { id: 9, title: 'Git Workflow Mastery', text: 'Collaborate effectively with your team using advanced Git techniques.', madeBy: 'Iris', comments: [{commenter: 'teamlead', text: 'Great workflow guide', stars: 4}]},
    { id: 10, title: 'Testing JavaScript Code', text: 'Write reliable tests using Jest and ensure your code quality stays high.', madeBy: 'Jack', comments: [{commenter: 'qa', text: 'Comprehensive coverage', stars: 5}]},
    { id: 11, title: 'Database Optimization', text: 'Improve database performance with indexing, caching, and query optimization.', madeBy: 'Kate', comments: [{commenter: 'dbadmin', text: 'Performance doubled', stars: 5}]},
    { id: 12, title: 'Authentication Security', text: 'Implement secure authentication and protect user data in your applications.', madeBy: 'Leo', comments: [{commenter: 'security', text: 'Essential knowledge', stars: 5}, {commenter: 'user3', text: 'Feel safer now', stars: 4}]},
    { id: 13, title: 'Responsive Design Patterns', text: 'Create beautiful interfaces that work perfectly on all screen sizes.', madeBy: 'Maya', comments: [{commenter: 'mobile', text: 'Mobile first approach', stars: 4}]},
    { id: 14, title: 'API Integration Guide', text: 'Connect your frontend to external APIs and handle data seamlessly.', madeBy: 'Nathan', comments: [{commenter: 'fullstack', text: 'Clear and concise', stars: 5}]},
    { id: 15, title: 'Debugging Techniques', text: 'Master debugging tools and techniques to solve problems faster.', madeBy: 'Olivia', comments: [{commenter: 'junior', text: 'Super helpful tips', stars: 5}, {commenter: 'mentor', text: 'Exactly what my team needed', stars: 5}]},
  ];

  useEffect(() => {
    setAllblogs(mockBlogs);
    return;
  }, []);

  return (
    <>
      {allblogs.map((blog, index) => (
        <div key={index} id='blog-title-card'>
          <h2>{blog.title}</h2>
          <p style={{fontSize: 18}}>{blog.text}</p>
          <div>
            <br />
            <p style={{fontWeight:"bold", fontSize: 18}}>Commments: <span style={{fontWeight:"lighter"}}>{blog.comments.length}</span></p>
            {blog.comments.map((comment:any, index:number) => (
              <>
                <p key={`commenter-${index}`}>{comment.commenter}</p>
              </>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

function Home() {
    return (
        <>
            <Blogs />
        </>
    )
}

export default Home