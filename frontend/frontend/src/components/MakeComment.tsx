import {useEffect, useState} from "react"
import type { Comment } from "./ShowBlogs"
import GetBlogs from "./GetBlogs";

import '../styles/MakeComment.css';

export default function MakeComment() {

    const [commenter, setCommenter] = useState<string>();
    const [text, setText] = useState<string>();
    const [stars, setStars] = useState<number | undefined>();

    async function postComment() {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/blog/0/comment', {
                method: 'POST',
                headers: {
                    'content-type':  'application/json'
                },
                body: JSON.stringify({
                    commenter: commenter,
                    text: text,
                    stars: stars,
                })
            })

            if (!response.ok) {
                throw new Error('failed to post comment')
            }

            return response
        } catch (err) {
            // give error message to user
        } finally {
            // 
        }
    }
    function handleSubmit() {
        // first handle request
        if (text === undefined) {
            alert("Chicken.");
            return;
        }
        alert(
            `Text: ${text}\n
            Stars: ${stars === undefined ? "No rating given" : stars}`
        );
        // get feedback from backend and report to user


        // refresh page
        postComment();
    }
    return (
        <div id="make-comment-container">
            <form action={handleSubmit}>
                <input
                id="comment-text-field" 
                type="text" 
                placeholder="Ăn khi ngồi luôn"
                onChange={(e) => setText(e.target.value)} />
                <br />
                <input 
                id="comment-range-stars" 
                type="range" 
                min={1} max={5}
                onChange={(e) => setStars(Number(e.target.value))}/>
                <input id="comment-submit" type="submit" value="Send" />
            </form>
        </div>
    )
}