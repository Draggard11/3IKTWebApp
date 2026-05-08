import { useState } from "react";
import { postComment } from "../services/comment";
import "../styles/MakeComment.css";

export default function MakeComment({ id, refreshKey }: { id: number, refreshKey: number }) {
  const [text, setText] = useState<string>();
  const [stars, setStars] = useState<number>(0);

  function handleSubmit() {
    // first handle request
    if (text === undefined) {
      alert("Chicken.");
      return;
    }
    alert(
      `Text: ${text}\nStars: ${stars === undefined ? "No rating given" : stars}`,
    );
    // get feedback from backend and report to user

    // refresh page
    postComment(id, text, stars);
  }
  return (
    <div className="make-comment-container">
      <form action={handleSubmit}>
        <input
          className="comment-text-field"
          type="text"
          placeholder="Ăn khi ngồi luôn"
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <input
            className="comment-range-stars"
            type="range"
            defaultValue={0}
            min={0}
            max={5}
            onChange={(e) => setStars(Number(e.target.value))}
          /><p>{stars}</p>
        </div>
        <input className="comment-submit" type="submit" value="Send" />
      </form>
    </div>
  );
}
