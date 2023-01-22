import Togglable from './Togglable';
import CreateNewBlog from './CreateNewBlog';
import Blogs from './Blogs';

const HomeView = ({ createBlogRef, createBlog }) => {
  return (
    <div>
      <Togglable buttonLabel="new blog" ref={createBlogRef}>
        <CreateNewBlog {...{ createBlog }} />
      </Togglable>
      <Blogs />
    </div>
  );
};

export default HomeView;
