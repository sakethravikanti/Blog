import { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';
import Navbar from './Navbar';
// import { useLocation } from "react-router-dom";
const ApiCaller = () => {
    // const location = useLocation();
    // const { username: stateUsername } = location.state || {}; // Access the passed state
    const username =localStorage.getItem("username");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [editPost, setEditPost] = useState({ id: null, title: '', content: '', author: '' });

    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/blog/api/posts/');
            setData(response.data);
            setTimeout(() => setLoading(false), 2000);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

  
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/blog/api/posts/${id}/delete`);
            setData(data.filter((post) => post.id !== id)); // Update UI
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

   
    const handleEdit = (post) => {
        setEditMode(true);
        setEditPost(post);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditPost({ ...editPost, [name]: value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/blog/api/posts/${editPost.id}/edit`,
                editPost
            );
            setData(data.map((post) => (post.id === response.data.id ? response.data : post)));
            setEditMode(false);
            setEditPost({ id: null, title: '', content: '', author: '' });
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <><Navbar></Navbar>
        <p>Hello, {username}!</p>
            {loading ? (
                <ClipLoader size={200} color={"white"} loading={loading} />
            ) : (
                <>
                    {editMode ? (
                        <form onSubmit={handleEditSubmit}>
                            <input
                                type="text"
                                name="title"
                                value={editPost.title}
                                onChange={handleEditChange}
                                placeholder="Title"
                                required
                            />
                            <textarea
                                name="content"
                                value={editPost.content}
                                onChange={handleEditChange}
                                placeholder="Content"
                                required
                            />
                            <button type="submit">Save</button>
                            <button onClick={() => setEditMode(false)}>Cancel</button>
                        </form>
                    ) : (
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Content</th>
                                    <th>Author</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((post) => (
                                    <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.content}</td>
                                        <td>{post.author}</td>
                                        <td>
                                            <button onClick={() => handleEdit(post)}>Edit</button>
                                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </>
    );
};

export default ApiCaller;
