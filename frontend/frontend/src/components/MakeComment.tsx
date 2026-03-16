import { useState } from "react"
import type { Comment } from "./ShowBlogs"
import GetBlogs from "./GetBlogs";

export default function MakeComment() {

    const [comment, setComment] = useState<Comment>();

    return (
        <form style={{marginTop: 8}}>
            <input type="text" placeholder="Ăn khi ngồi luôn" />
            <br />
            <input type="range" min={1} max={5} />
            <br />
            <input type="submit" value="Send" onClick={() => alert("Đừng ăn mớn ")} />
        </form>    
    )
}