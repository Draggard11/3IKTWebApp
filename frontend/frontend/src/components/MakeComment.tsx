import { useState } from "react"
import type { Comment } from "./ShowBlogs"
import GetBlogs from "./GetBlogs";

import '../styles/MakeComment.css';

export default function MakeComment() {

    const [commenter, setCommenter] = useState<string>();
    const [text, setText] = useState<string>();
    const [stars, setStars] = useState<number>();

    return (
        <div id="make-comment-container">
            <form>
                <input id="comment-text-field" type="text" placeholder="Ăn khi ngồi luôn" />
                <br />
                <input id="comment-range-stars" type="range" min={1} max={5} />
                <input id="comment-submit" type="submit" value="Send" />
            </form>
        </div>
    )
}