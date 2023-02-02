import Togglable from './Togglable';
import CreateNewBlog from './CreateNewBlog';
import Blogs from './Blogs';

const HomeView = ({ createBlogRef }) => {
  return (
    <div>
      <h1>Blogs</h1>
      <Togglable buttonLabel="new blog" ref={createBlogRef}>
        <CreateNewBlog {...{ createBlogRef }} />
      </Togglable>
      <Blogs />
    </div>
  );
};

export default HomeView;
