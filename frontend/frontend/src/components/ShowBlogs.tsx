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
            <div className='comments-container'>
                <div className='comment-section'>
                    {blog.comments.map((comment) => (
                        <div className='comments-row' key={`${comment.commenter}-${comment.text}`}>
                            <div className='comments-row-header'>
                                <h4>{comment.commenter}</h4>
                                <span className='comments-row-stars'>
                                    {'★ '.repeat(comment.stars)}
                                </span>
                            </div>
                            <div className='seperator' />
                            <p style={{ fontWeight: 50, fontSize: 14 }}>{comment.text}</p>
                        </div>
                    ))}
                    <br />
                </div>
                <MakeComment />
            </div>
        )
    }

    return (
        <div style={{ width: canShowMoreText ? '50%' : 'fit-content' }} id="blog-card-container">
            <div className='blog-title-and-text-container'>
                <h2 key={`title-${blog.title}`} id='blog-title'>{blog.title}</h2>
                <div key={`container-${blog.id}`} id='blog-text-container'>
                    <p key={`text-${blog.id}`} id='blog-text'>{!canShowMoreText ? blog.text.slice(0, 50) + '...' : blog.text}
                        <span style={{ color: 'transparent', userSelect: 'none' }}>__</span>
                        <button key={blog.id} onClick={() => setCanShowMoreText(!canShowMoreText)}>{canShowMoreText ? 'Hide text' : 'Show text'}</button>
                    </p>
                </div>
            </div>
            <div className='comment-section-container'>
                <p style={{ fontWeight: "bold", fontSize: 16 }}>
                    Comments:
                    <span style={{ fontWeight: "lighter" }}>{blog.comments.length}</span>
                    <span style={{ color: 'transparent', userSelect: 'none' }}>_</span>
                    <button onClick={() => setShowComments(!showComments)}>{showComments ? 'Hide comments' : 'Show comments'}</button>
                </p>
                {showComments ? Comments() : ''}
            </div>
        </div>
   )
}
