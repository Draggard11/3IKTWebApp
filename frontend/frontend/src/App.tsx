import { useEffect, useState } from 'react'
import './App.css'

const Blogs = () => {
  
  const [allblogs, setAllblogs] = useState<any[]>([]);

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const response = await fetch('http://127.0.0.1:5000/api/blogs');
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
    { id: 1, title: 'Test blog 1', text: 'Hello World' },
    { id: 2, title: 'Test blog 2', text: 'Hello Earth' },
  ];

  useEffect(() => {
    setAllblogs(mockBlogs);
    return;
  }, []);

  return (
    <>
      {allblogs.map((blog, index) => {
        <div key={index} id='blog-title-card'>
          <p>{blog.title}</p>
        </div>
      })}
    </>
  )

}

function App() {
  return (
    <>
      <div>
        {/*"ingrapon, ruva"*/}
        <h1>VCSCHCIBP</h1>
        <h3></h3>
      </div>
      <div>
        <Blogs />
      </div>
    </>
  )
}

export default App
