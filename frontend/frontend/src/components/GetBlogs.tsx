import React, { useState } from "react";
import type { Blog } from "./ShowBlogs";
import { BlogCard } from "./ShowBlogs";
import '../styles/GetBlogs.css';

//import mockBlogs from './MockBlogs.json';
import { fetchBlogs } from "../services/blogs";

function GetBlogs({refreshKey} : {refreshKey: number}) {
  //let allBlogs: Blog[] = mockBlogs;

  const blogCounterSteps = 10;

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [currentBlogs, setCurrentBlogs] = useState<Blog[]>([]);
  const [totalBlogs, setTotalBlogs] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const blogs = await fetchBlogs(pageNumber, blogCounterSteps);
        setCurrentBlogs(blogs);

        setTotalBlogs(blogs.length * pageNumber + blogCounterSteps);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, [pageNumber, refreshKey]);

  const [disableNextBtn, setDisableNextBtn] = useState<boolean>(false);
  const [disableLastBtn, setDisableLastBtn] = useState<boolean>(true);

  function ShowBlogs() {
    if (loading) return <p>Loading blogs...</p>;
    if (error) return <p>Error: {error}</p>;
    return currentBlogs.map((blog) => (
      <BlogCard refreshKey={refreshKey} key={blog.id} blog={blog} />
    ));
  }

  const NextPage = () => {
    if (pageNumber == Math.ceil(totalBlogs / blogCounterSteps)) {
      setDisableNextBtn(true);
      return;
    }
    setDisableNextBtn(false);
    setDisableLastBtn(false);
    setPageNumber(pageNumber + 1);
  };

  const LastPage = () => {
    if (pageNumber == 1) {
      setDisableLastBtn(true);
      return;
    }
    setDisableLastBtn(false);
    setDisableNextBtn(false);
    setPageNumber(pageNumber - 1);
  };

  return (
    <div className="blogs-container">
      <p className="showing-n-blogs">{currentBlogs.length === 1 ? 'Showing 1 blog' : `Showing ${currentBlogs.length} blogs`}</p>
      <div className="blogs">
        {ShowBlogs()}
      </div>
      <p style={{ marginBottom: 8 }}>Page {pageNumber} / {Number(currentBlogs) / pageNumber}</p>
      <div className="switch-page-container">
        <button className="switch-page" disabled={disableLastBtn} onClick={() => LastPage()}>{'<'} Last page</button>
        <button className="switch-page" disabled={disableNextBtn} onClick={() => NextPage()}>Next page {'>'}</button>
      </div>
    </div>
  )

  //   const [allblogs, setAllblogs] = useState<any[]>([]);
  //     useEffect(() => {
  //         const fetchBlogs = async () => {
  //         try {
  //             const response = await fetch('http://127.0.0.1:5000');
  //             const data = await response.json();
  //             console.log(`Response's response: ${response}`);
  //             setAllblogs(data);
  //         }
  //         catch (error) {
  //             console.error('Error when fetching blogs: ', error);
  //         }
  //         }; fetchBlogs();
  //     }, []);
}

export default GetBlogs
