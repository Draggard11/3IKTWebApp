import { useEffect, useState } from "react";
import '../styles/Home.css';
import GetBlogs from "../components/GetBlogs";

const Blogs = () => {
  const blogs = GetBlogs();
  const maxChars = 30;

  const 

  return (
    <>
      {blogs.map((blog, index) => (
        <div key={index} id='blog-title-card'>
          <h2>{blog.title}</h2>
          <p style={{fontSize: 16}}>{blog.text}<button onClick={() => showMoreText(index)}>Show more for £19.99</button> </p>
          <div>
            <p style={{fontWeight:"bold", fontSize: 16}}>Commments: <span style={{fontWeight:"lighter"}}>{blog.comments.length}</span></p>
            {/* {blog.comments.map((comment:any, index:number) => (
              <>
                <p key={`commenter-${index}`}>{comment.commenter}</p>
              </>
            ))} */}
          </div>
          <button id="showComment">Show comments</button>
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