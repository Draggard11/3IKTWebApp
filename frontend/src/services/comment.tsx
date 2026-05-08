export function getCookie(name: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const ret = parts.pop()?.split(";").shift();
    if (ret) {
      return ret;
    }
  }
  return "";
}

export async function postComment(
  id: number,
  text: string,
  stars: number
): Promise<Response> {
  const csrfToken = getCookie("csrf_access_token");

  try {
    const response = await fetch(`http://127.0.0.1:5000/api/blog/${id}/comment`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({
        text: text,
        stars: stars,
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
