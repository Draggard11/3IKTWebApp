import '../styles/palette.css';

const MakeBlogs = () => {

  return (
    <>
      <div style={{ display: 'flex', borderStyle: 'inset', borderColor: '#7fc7a7', borderWidth: 3, padding: 12, borderRadius: 16, backgroundColor: '#fcfaf8' }}>
        <form method="post" style={{ padding: 12 }}>
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

export default MakeBlogs
