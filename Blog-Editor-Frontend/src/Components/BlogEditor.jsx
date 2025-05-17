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
  console.log(id)
  useEffect(() => {
    if (id) {
      getBlogById(id).then(({ data }) => {
        setBlog({
          id: data._id,
          title: data.title,
          content: data.content,
          tags: data.tags.join(', '),
        });
      });
    }
  }, [id]);

  const autoSave = useRef();

  useEffect(() => {
    autoSave.current = setInterval(() => {
      if (blog.title || blog.content) handleSave(false); // auto-save every 30 seconds
    }, 30000);
    return () => clearInterval(autoSave.current);
  }, [blog]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      if (autoSave.current && (blog.title || blog.content)) {
        handleSave(false, true); // auto save
      }
    }, 5000)); // idle save after 5s auto save
  };


  const handleSave = async (navigateAfter = false, isAuto = false) => {
    const updatedBlog = {
      ...blog,
      tags: blog.tags.split(',').map(t => t.trim())
    };

    const res = await createDraft(updatedBlog);

    setBlog(prev => ({
      ...prev,
      id: res.data._id
    }));
    if (isAuto) toast.success('Draft auto-saved!');
    if (navigateAfter) navigate('/blogs');
  };


  const handlePublish = async () => {
    autoSave.current = false;
    clearInterval(autoSave.current); // stop interval
    clearTimeout(timer); // stop idle timeout
    await publishBlog({ ...blog, tags: blog.tags.split(',').map(t => t.trim()) });
    navigate('/blogs');
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
        <button className="btn publish-btn" onClick={handlePublish}>Publish</button>
      </div>
    </div>
  );
};

export default BlogEditor;
