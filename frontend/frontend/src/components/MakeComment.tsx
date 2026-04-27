import { useEffect, useState } from "react";
import type { Comment } from "./ShowBlogs";
import GetBlogs from "./GetBlogs";
import { postComment } from "../services/comment";
import "../styles/MakeComment.css";

export default function MakeComment() {
  const [text, setText] = useState<string>();
  const [stars, setStars] = useState<number>(1);

  function handleSubmit() {
    // first handle request
    if (text === undefined) {
      alert("Chicken.");
      return;
    }
    alert(
      `Text: ${text}\n
            Stars: ${stars === undefined ? "No rating given" : stars}`,
    );
    // get feedback from backend and report to user

    // refresh page
    postComment(text, stars);
  }
  return (
    <div id="make-comment-container">
      <form action={handleSubmit}>
        <input
          id="comment-text-field"
          type="text"
          placeholder="Ăn khi ngồi luôn"
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <input
          id="comment-range-stars"
          type="range"
          min={1}
          max={5}
          onChange={(e) => setStars(Number(e.target.value))}
        />
        <input id="comment-submit" type="submit" value="Send" />
      </form>
    </div>
  );
}
