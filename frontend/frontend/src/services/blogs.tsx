import type { Blog } from "../components/ShowBlogs";
import { getCookie } from "./comment";

export async function fetchBlogs(page: number, limit = 10): Promise<Blog[]> {
  const response = await fetch(
    `http://127.0.0.1:5000/api/blogs?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return await response.json();
}

export async function postBlog(title: string, text: string): Promise<Response> {
  const csrfToken = getCookie("csrf_access_token");

  const response = await fetch("http://127.0.0.1:5000/api/blog", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-CSRF-TOKEN": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify({ title, text }),
  });

  return response; // return the raw Response so .ok is available
}
