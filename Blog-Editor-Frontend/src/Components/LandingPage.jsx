import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="hero">
        <h1>Welcome to the Blog Editor</h1>
        <p>Create, auto-save, and publish your blogs effortlessly.</p>
        <div className="buttons">
          <button onClick={() => navigate('/new')}>Write a Blog</button>
          <button onClick={() => navigate('/blogs')}>View All Blogs</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
