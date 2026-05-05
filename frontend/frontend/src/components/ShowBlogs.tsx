import { useState } from "react";

import "../styles/ShowBlogs.css";

import MakeComment from "./MakeComment";

import { useUsername } from "./UserContext.tsx";

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

export function BlogCard({ refreshKey, blog }: { refreshKey: number, blog: Blog }) {
  const [canShowMoreText, setCanShowMoreText] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);

  const { username } = useUsername();

  const Comments = () => {
    return (
      <div className="comments-container">
        <div className="comment-section">
          {blog.comments.map((comment) => (
            <div
              className="comments-row"
              key={`${comment.commenter}-${comment.text}`}
            >
              <div className="comments-row-header">
                <h4>{comment.commenter}</h4>
                <span className="comments-row-stars">
                  {"★ ".repeat(comment.stars)}
                </span>
              </div>
              <div className="seperator" />
              <p style={{ fontWeight: 50, fontSize: 14 }}>{comment.text}</p>
            </div>
          ))}
        </div>
        {!username ? (
          <MakeComment refreshKey={refreshKey} />
        ) : (
          <div
            style={{
              borderStyle: "solid",
              padding: 12,
              borderWidth: 2,
              borderRadius: 16,
            }}
          >
            <p>You need to be logged in to write comments.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{width: 500}}
      className="blog-card-container"
    >
      <div className="blog-title-and-text-container">
        <h2 key={`title-${blog.title}`} className="blog-title">
          {blog.title}
        </h2>
        <div key={`container-${blog.id}`} className="blog-text-container">
          <p key={`text-${blog.id}`} className="blog-text">
            {!canShowMoreText && blog.text.length > 50
              ? blog.text.slice(0, 50) + "..."
              : blog.text}
            <span style={{ color: "transparent", userSelect: "none" }}>__</span>
            {blog.text.length > 50 ? (
              <button
                key={blog.id}
                onClick={() => setCanShowMoreText(!canShowMoreText)}
              >
                {canShowMoreText ? "Hide text" : "Show text"}
              </button>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
      <div className="comment-section-container">
        <p style={{ fontWeight: "bold", fontSize: 16 }}>
          Comments:
          <span style={{ fontWeight: "lighter" }}>{blog.comments.length}</span>
          <span style={{ color: "transparent", userSelect: "none" }}>_</span>
          <button onClick={() => setShowComments(!showComments)}>
            {showComments ? "Hide comments" : "Show comments"}
          </button>
        </p>
        {showComments ? Comments() : ""}
      </div>
    </div>
  );
}
