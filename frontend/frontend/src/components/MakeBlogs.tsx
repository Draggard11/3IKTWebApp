
const MakeBlogs = () => {
    
    return (
        <>
            <form method="post">
                <label>
                    Post title: <input name="myInput" />
                </label>
                <br />
                <label>
                    Edit your post:
                    <textarea 
                        name="postContent"
                        defaultValue="Ông đang nghĩ gì vậy?"
                        rows={4}
                        cols={40}
                    />
                </label>
                <hr />
                <button type="submit">Post</button>
            </form>
        </>
    )
}

export default MakeBlogs