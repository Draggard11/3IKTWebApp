
import { useState } from 'react';
import '../styles/ShowBlogs.css';

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

export function BlogCard({ blog }: { blog: Blog }) {

    const [canShowMoreText, setCanShowMoreText] = useState<boolean>(false);

    const ShowText = () => {
        setCanShowMoreText(true);
    }
    
    return (
        <div id="blog-title-card">
          <h2>{blog.title}</h2>
            <p>{!canShowMoreText ? blog.text.slice(0, 50) + '...' : blog.text}<span style={{color: 'transparent', userSelect: 'none'}}>__</span>{!canShowMoreText ? <button onClick={() => ShowText()}>Show more for £19.99</button> : ''} </p>
            <div>
                <p style={{fontWeight:"bold", fontSize: 16}}>Commments: <span style={{fontWeight:"lighter"}}>{blog.comments.length}</span><span style={{color: 'transparent', userSelect: 'none'}}>_</span><button id="showComment">Show comments</button></p>
            </div>
        </div>
   )
}