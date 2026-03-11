import '../styles/Home.css';
import GetBlogs from "../components/GetBlogs";

function Home() {
    return (
        <div id='container'>
            <h1>Blogs</h1>
            <br />
            <GetBlogs />
        </div>
    )
}

export default Home