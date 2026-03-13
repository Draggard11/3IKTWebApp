import { useState, useEffect } from "react";
import type { Blog } from "./ShowBlogs";
import { BlogCard } from "./ShowBlogs";
import '../styles/GetBlogs.css';

import mockBlogs from './MockBlogs.json';

function GetBlogs() {
    const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
    const [blogCounter, setBlogCounter] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const displayNBlogs = allBlogs.slice(0, blogCounter);

    useEffect(() => {
        setAllBlogs(mockBlogs);
        setBlogCounter(20);
    }, []);

    return (
        <div id="blogs-container">
            <div id="blogs">
                <p>Showing {displayNBlogs.length} blogs</p>
                {}
                {displayNBlogs.map((blog) => (
                    <>
                        <BlogCard key={blog.id} blog={blog} />
                        {/*<button onClick={() => ExpandBlog(blog.id)}>Show more for £19.95</button>*/}
                    </>
                ))}
            </div>
            <p style={{marginBottom: 8}}>Page {pageNumber}</p>
            <div id="switch-page-container">
                <button className="switch-page">{'<'} Last page</button>
                <button className="switch-page">Next page {'>'}</button>
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