import { postBlog } from '../services/blogs';
import '../styles/palette.css';

export default function MakeBlogs({onSuccess} : {onSuccess: () => void}) {

  // MakeBlogs — call onSuccess after potato alert
    const pb = async (formData: any) => {
      const response = await postBlog(formData.get('myInput'), formData.get('postContent'));
      if (!response.ok) {
        alert('Something went wrong');
        return;
      }
      alert('Potato');
      onSuccess(); // ← trigger refresh
    }

  return (
    <>
      <div style={{ display: 'flex', borderStyle: 'inset', borderColor: '#7fc7a7', borderWidth: 3, padding: 12, borderRadius: 16, backgroundColor: '#fcfaf8' }}>
        <form action={pb} style={{ padding: 12 }}>
          <label style={{ borderStyle: 'solid', borderWidth: 2, padding: 18, borderRadius: 16, backgroundColor: '#99d199' }}>
            Post title: <input name="myInput" style={{ padding: 8 }} />
          </label>
          <br /><br />
          <div style={{ borderStyle: 'solid', borderWidth: 2, padding: 8, borderRadius: 16, backgroundColor: '#99d199' }}>
            <label style={{}}>
              Edit your post:
              <textarea
                name="postContent"
                placeholder="Ông đang nghĩ gì vậy?"
                rows={15}
                cols={60}
              />
            </label>
          </div>
          <hr />
          <button type="submit">Post</button>
        </form >
      </div >
    </>
  )
}
