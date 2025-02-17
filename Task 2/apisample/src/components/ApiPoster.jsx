import { useState } from 'react';
import axios from 'axios';

const ApiPoster = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = { title, content };

    try {
      const response = await axios.post('http://127.0.0.1:8000/blog/api/posts/add', post, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMessage('Post Added ');
      console.log(response.data);
    } catch (error) {
      console.error('Blog post Error', error);
      setMessage('Error adding task.');
    }
  };
  
  return (
    <div>
      <h2>Make a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApiPoster;
