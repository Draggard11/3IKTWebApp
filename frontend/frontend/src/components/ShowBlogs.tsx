import { useState } from 'react';
import '../styles/ShowBlogs.css';
import MakeComment from './MakeComment';

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

    const [showComments, setShowComments] = useState<boolean>(false);

    const Comments = () => {
        return (
            <div id='comment-section'>
                {blog.comments.map((comment) => (
                    <div id='comments-row'>
                        <h4>{comment.commenter} - 
                            <span style={{borderColor: 'yellow'}}>
                                <span style={{color: 'transparent', userSelect: 'none',}}>_</span>
                                    {comment.stars}
                                <span style={{color: 'transparent', userSelect: 'none'}}>_</span>
                            </span>
                        </h4>
                        <p style={{fontWeight: 100}}>{comment.text}</p>
                    </div>
                ))}
                <br />
                <MakeComment />
            </div>
        )
    }
    
    return (
        <div id="blog-title-card">
          <h2>{blog.title}</h2>
            <p id='blog-text'>{!canShowMoreText ? blog.text.slice(0, 50) + '...' : blog.text}
                <span style={{color: 'transparent', userSelect: 'none'}}>__</span>
                <button key={blog.id} onClick={() => setCanShowMoreText(!canShowMoreText)}>{canShowMoreText ? 'Hide text' : 'Show text'}</button>
            </p>
            <div id='comment-section-container'>
                <p style={{fontWeight:"bold", fontSize: 16}}>
                    Comments:
                    <span style={{fontWeight:"lighter"}}>{blog.comments.length}</span>
                    <span style={{color: 'transparent', userSelect: 'none'}}>_</span>
                    <button onClick={() => setShowComments(!showComments)}>{showComments ? 'Hide comments' : 'Show comments'}</button>
                </p>
                {showComments ? Comments() : ''}
            </div>
        </div>
   )
}