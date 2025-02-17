import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Profile = () => {
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [editMode, setEditMode] = useState(false);
    const [email, setEmail] = useState(''); // Add email or other details as needed

    useEffect(() => {
        // Fetch user details if stored or from an API
        const storedEmail = localStorage.getItem('email'); // Example
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        // Update user details in localStorage or send a request to the backend
        localStorage.setItem('username', username);
        localStorage.setItem('email', email); // Example for email
        setEditMode(false);
    };

    return (
        <>
            <Navbar />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>Profile</h1>
                {editMode ? (
                    <div>
                        <label>
                            Username: 
                            <input 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </label>
                        <br />
                        <label>
                            Email: 
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </label>
                        <br />
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleEditToggle} style={{ marginLeft: '10px' }}>Cancel</button>
                    </div>
                ) : (
                    <div>
                        <p><strong>Username:</strong> {username}</p>
                        <p><strong>Email:</strong> {email || 'Not set'}</p>
                        <button onClick={handleEditToggle}>Edit Profile</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Profile;
