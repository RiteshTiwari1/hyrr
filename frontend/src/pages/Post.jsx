import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add this import

export const Post = () => {
  const [postContent, setPostContent] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // If token doesn't exist, redirect to signUp page
    if (!token) {
      navigate('/'); // Replace with the actual path to your signUp page
    }
    setShow(true);
  }, [navigate]);

  const handlePost = async () => {
    console.log("hello");
    try {
      const token = localStorage.getItem('token');

      // Make a POST request to the /create endpoint with the post content
      const response = await axios.post(
        'http://localhost:3000/api/v1/post/create',
        { content: postContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle error if needed
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    handlePost(); // Call your custom handling function
  };

  return show && (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="postContent" className="block text-gray-700 text-sm font-bold mb-2">
            Post Content
          </label>
          <textarea
            id="postContent"
            name="postContent"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Write your post here..."
          />
        </div>
        <div>
          <button
            type="submit" // Set the type as "submit" to trigger onSubmit
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};
