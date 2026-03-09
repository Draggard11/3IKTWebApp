

export interface Blog {
    id: number;
    title: string;
    text: string;
    madeBy: string;
    comments: Comment[];
}

export interface Comment {
    commenter: string;
    text: string;
    stars: number;
}

export function ShowBlogs(blog: Blog) {
}
