import { useState, useEffect } from "react";
import type { Blog } from "./ShowBlogs";
import { BlogCard } from "./ShowBlogs";
import MakeComment from "./MakeComment";
import '../styles/GetBlogs.css';

import mockBlogs from './MockBlogs.json';

function GetBlogs() {
    const [allBlogs, setAllBlogs] = useState<Blog[]>(mockBlogs);

    const blogCounterSteps = 10;
    const [blogCounterStart, setBlogCounterStart] = useState<number>(0);
    const [blogCounterEnd, setBlogCounterEnd] = useState<number>(blogCounterSteps);

    const [pageNumber, setPageNumber] = useState<number>(1);

    const displayNBlogs = allBlogs.slice(blogCounterStart, blogCounterEnd);

    const [disableNextBtn, setDisableNextBtn] = useState<boolean>(false);
    const [disableLastBtn, setDisableLastBtn] = useState<boolean>(true);

    function ShowBlogs() {
        return (
            displayNBlogs.map((blog) => (
                <>
                    <BlogCard key={blog.id} blog={blog} />
                    {/*<button onClick={() => ExpandBlog(blog.id)}>Show more for £19.95</button>*/}
                </>
            ))
        )
    }

    const NextPage = () => {
        
        if (pageNumber === allBlogs.length / blogCounterSteps) {
            setDisableNextBtn(true);
            return;
        }
        setDisableNextBtn(false);
        setDisableLastBtn(false);

        setPageNumber(pageNumber + 1);

        setBlogCounterStart(blogCounterStart + blogCounterSteps); //changes the blog's start value to display
        setBlogCounterEnd(blogCounterEnd + blogCounterSteps); //changes the blog's end value to display
    }

    const LastPage = () => {

        if (pageNumber === 1) {
            setDisableLastBtn(true);
            return;
        }
        setDisableLastBtn(false);
        setDisableNextBtn(false);
        
        setPageNumber(pageNumber - 1);

        setBlogCounterStart(blogCounterStart - blogCounterSteps); //changes the blog's start value to display
        setBlogCounterEnd(blogCounterEnd - blogCounterSteps); //changes the blog's end value to display
    }

    return (
        <div id="blogs-container">
            <p id="showing-n-blogs">Showing {displayNBlogs.length} blogs</p>
            <div id="blogs">
                {ShowBlogs()}
            </div>
            <p style={{marginBottom: 8}}>Page {pageNumber} / {allBlogs.length / blogCounterSteps}</p>
            <div id="switch-page-container">
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