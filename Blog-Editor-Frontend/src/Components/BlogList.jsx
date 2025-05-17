// BlogList.jsx
import { useEffect, useState } from 'react';
import { getAllBlogs, deleteBlog } from '../api/BlogApi';
import { useNavigate } from 'react-router-dom';
import '../App.css';  // We'll create this CSS file

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBlogs().then(({ data }) => setBlogs(data));
  }, []);

const handleDelete = (id) => {
  deleteBlog(id).then(() => {
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
  });
};

  const published = blogs.filter(b => b.status === 'published');
  const drafts = blogs.filter(b => b.status === 'draft');

  return (
    <div className="container">
      <h2>Published Blogs</h2>
      <div className="blog-list">
        {published.length ? published.map(b => (
          <div key={b._id} className="blog-item published">
            <h4>{b.title}</h4>
            <div className="blog-content">
            <button onClick={() => navigate(`/edit/${b._id}`)}>Edit</button>
            <button onClick={() => handleDelete(b._id)}>Delete</button>
            </div>
          </div>
        )) : <p>No published blogs yet.</p>}
      </div>

      <h2>Drafts</h2>
      <div className="blog-list">
        {drafts.length ? drafts.map(b => (
          <div key={b._id} className="blog-item draft">
            <h4>{b.title}</h4>
            <div className="blog-content">
            <button onClick={() => navigate(`/edit/${b._id}`)}>Edit</button>
            <button onClick={() => handleDelete(b._id)}>Delete</button>
            </div>
          </div>
        )) : <p>No drafts yet.</p>}
      </div>

      <button className="create-btn" onClick={() => navigate('/new')}>Create New Blog</button>
    </div>
  );
};

export default BlogList;
