import type { Blog } from "../components/ShowBlogs";
import { getCookie } from "./comment";

export async function fetchBlog(id: number): Promise<Blog[]> {
  const response = await fetch(`http://127.0.0.1:5000/api/blog/${id}`);

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Request failed: ${response.status}`);
    } else {
      throw new Error(
        `Request failed: ${response.status} ${response.statusText}`,
      );
    }
  }

  const blog = await response.json();
  return Array.isArray(blog) ? blog : [blog]; // ← wrap single object in array
}

export async function postBlog(title: string, text: string): Promise<Response> {
  const csrfToken = getCookie("csrf_access_token");

  try {
    const response = await fetch("http://127.0.0.1:5000/api/blog", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({
        title: title,
        text: text,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return Promise.reject(errorData.error || "Login failed");
    }
    return await response.json();
  } catch (err) {
    return Promise.reject(err);
  }
}
