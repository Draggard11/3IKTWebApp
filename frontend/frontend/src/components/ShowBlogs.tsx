
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

    const ShowComments = () => {
        return (
            <p>Xin chao</p>
        )
    }
    
    return (
        <div id="blog-title-card">
          <h2>{blog.title}</h2>
            <p style={{fontSize: 20}}>{!canShowMoreText ? blog.text.slice(0, 50) + '...' : blog.text}
                <span style={{color: 'transparent', userSelect: 'none'}}>__</span>
                <button key={blog.id} onClick={() => ShowText()}>Show more</button>
            </p>
            <div>
                <p style={{fontWeight:"bold", fontSize: 16}}>Commments:
                    <span style={{fontWeight:"lighter"}}>{blog.comments.length}</span>
                    <span style={{color: 'transparent', userSelect: 'none'}}>_</span>
                    <button key={blog.id} onClick={() => ShowComments()}>Show comments</button>
                    <div id='comment-section'>
                        {blog.comments.map((comment) => (
                            <div id='comments'>
                                <h4 style={{marginLeft: 8, width: 'fit-content', paddingRight: 12}}>{comment.commenter}</h4>
                                <p style={{fontWeight: 100}}>{comment.text}</p>
                            </div>
                        ))}
                    </div>
                </p>
            </div>
        </div>
   )
}