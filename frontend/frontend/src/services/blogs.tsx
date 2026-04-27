import type { Blog } from "../components/ShowBlogs";

// export async function fetchBlogs(page: number, limit: number = 10): Promise<Blog[]> {
//     try {
//         const response = await fetch(`http://127.0.0.1:5000/api/blogs?page=${page}&limit=${limit}`);
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.error || 'Failed to fetch blogs');
//         }
//         return await response.json();
//     } catch (err) {
//         throw err;  // Re-throw for caller to handle
//     }
// }

export async function fetchBlog(id: number): Promise<Blog[]> {
    try {
        const response = await fetch(`http://127.0.0.1:5000/api/blog/${id}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch blogs');
        }
        return await response.json();
    } catch (err) {
        throw err;  // Re-throw for caller to handle
    }
}