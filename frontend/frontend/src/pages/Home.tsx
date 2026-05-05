import '../styles/Home.css';
import GetBlogs from "../components/GetBlogs";

function Home({refreshKey} : {refreshKey: number}) {
    return (
        <div id='container'>
            <h1>Blogs</h1>
            <GetBlogs refreshKey={refreshKey} />
        </div>
    )
}

export default Home