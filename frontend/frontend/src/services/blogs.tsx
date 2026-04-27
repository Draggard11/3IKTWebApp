import type { Blog } from "../components/ShowBlogs";

export async function fetchBlog(id: number): Promise<Blog[]> {
    const response = await fetch(`http://127.0.0.1:5000/api/blog/${id}`);

    if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Request failed: ${response.status}`);
        } else {
            throw new Error(`Request failed: ${response.status} ${response.statusText}`);
        }
    }

    const blog = await response.json();
    return Array.isArray(blog) ? blog : [blog]; // ← wrap single object in array
}