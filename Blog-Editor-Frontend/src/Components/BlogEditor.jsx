import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDraft, publishBlog, getBlogById } from '../api/BlogApi';
import { toast } from 'react-toastify';
import '../App.css'; // Import CSS file

const BlogEditor = () => {
  const [blog, setBlog] = useState({ title: '', content: '', tags: '', id: null });
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const autoSaveInterval = useRef(null);
  const latestBlogRef = useRef(blog);

  // Keep ref in sync with blog state
  useEffect(() => {
    latestBlogRef.current = blog;
  }, [blog]);

  // Load blog if editing existing one
  useEffect(() => {
    if (id) {
      getBlogById(id)
        .then(({ data }) => {
          setBlog({
            id: data._id,
            title: data.title,
            content: data.content,
            tags: data.tags.join(', '),
          });
        })
        .catch(() => toast.error('Failed to load blog'));
    }
  }, [id]);

  // Auto-save every 30 seconds
  useEffect(() => {
    autoSaveInterval.current = setInterval(() => {
      const current = latestBlogRef.current;
      if (current.title || current.content) {
        handleSave(false, true);
      }
    }, 30000);
    return () => clearInterval(autoSaveInterval.current);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));

    clearTimeout(timer);
    setTimer(setTimeout(() => {
      const current = latestBlogRef.current;
      if (current.title || current.content) {
        handleSave(false, true); // Idle save after 5 seconds
      }
    }, 5000));
  };

  const handleSave = async (navigateAfter = false, isAuto = false) => {
    clearInterval(autoSaveInterval.current);
    clearTimeout(timer);

    const updatedBlog = {
      ...latestBlogRef.current,
      tags: latestBlogRef.current.tags.split(',').map(t => t.trim()),
    };

    try {
      const res = await createDraft(updatedBlog);
      setBlog((prev) => ({
        ...prev,
        id: res.data._id,
      }));
      if (isAuto) toast.success('Draft auto-saved!');
      if (navigateAfter) navigate('/blogs');
    } catch (error) {
      toast.error('Failed to save draft');
    }
  };

  const handlePublish = async () => {
    clearInterval(autoSaveInterval.current);
    clearTimeout(timer);

    try {
      await publishBlog({
        ...blog,
        tags: blog.tags.split(',').map(t => t.trim()),
      });
      navigate('/blogs');
    } catch (error) {
      toast.error('Failed to publish blog');
    }
  };

  return (
    <div className="editor-container">
      <h2>Blog Editor</h2>
      <input
        className="input-field"
        name="title"
        value={blog.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <textarea
        className="textarea-field"
        name="content"
        value={blog.content}
        onChange={handleChange}
        placeholder="Content"
        rows={10}
      />
      <input
        className="input-field"
        name="tags"
        value={blog.tags}
        onChange={handleChange}
        placeholder="Tags (comma-separated)"
      />
      <div className="button-group">
        <button className="btn draft-btn" onClick={() => handleSave(true)}>Save as Draft</button>
        <button
          className="btn publish-btn"
          onClick={handlePublish}
          disabled={!blog.title || !blog.content}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default BlogEditor;
