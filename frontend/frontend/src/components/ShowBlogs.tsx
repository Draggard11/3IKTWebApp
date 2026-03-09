import { useState } from "react";


export interface Blog {
    id: number;
    title: string;
    text: string;
    madeBy: string;
    comments: Comment[];
}

export interface Comment {
    commenter: string;
    text: string;
    stars: number;
}

export function ShowBlogs(blog: Blog) {
    const [showAllText, setShowAllText] = useState<number>();
    return (
        <>
          <h2>{blog.title}</h2>
            <p style={{fontSize: 16}}>{showAllText ? blog.text.slice(0, 50) + '... '}<button onClick={() => showAllText(index)}>Show more for £19.99</button> </p>
            <div>
                <p style={{fontWeight:"bold", fontSize: 16}}>Commments: <span style={{fontWeight:"lighter"}}>{blog.comments.length}</span></p>
                {/* {blog.comments.map((comment:any, index:number) => (
                <>
                    <p key={`commenter-${index}`}>{comment.commenter}</p>
                </>
                ))} */}
            </div>
          <button id="showComment">Show comments</button>
        </>
   )
}