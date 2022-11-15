const CreateNewBlog= ({
  handleNewBlog,
  newBlogTitle, setNewBlogTitle,
  newBlogAuthor, setNewBlogAuthor,
  newBlogUrl, setNewBlogUrl
}) => (
  <>
    <h2>create new</h2>
    <form onSubmit={handleNewBlog}>
      <div>
          title:
        <input
          type='text'
          value={newBlogTitle}
          name='title'
          onChange={({ target }) => setNewBlogTitle(target.value)} />
      </div>
      <div>
          author:
        <input
          type='text'
          value={newBlogAuthor}
          name='author'
          onChange={({ target }) => setNewBlogAuthor(target.value)} />
      </div>
      <div>
          url:
        <input
          type='url'
          value={newBlogUrl}
          name='url'
          onChange={({ target }) => setNewBlogUrl(target.value)} />
      </div>
      <button type='submit'>create</button>
    </form>
  </>
)

export default CreateNewBlog