import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate(); 

  const fetchPosts = async (pageNumber) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/api/v1/post/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newPosts = response.data.posts.map(post => ({
        ...post,
        id: uuidv4(), // Generate a new UUID for each post
      }));

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setLoading(false);
      setHasMore(newPosts.length > 0);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token expired or invalid, remove from local storage
        localStorage.removeItem("token");
        return navigate("/");
      }
  
      console.error("Error checking authentication:", error);
      return navigate("/");
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 100 && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-4">All Posts</h2>
      
      {loading ? (
        <div className="text-xl font-semibold">Loading...</div>
      ) : (
        posts.length === 0 ? (
          <div className="text-xl font-semibold">No posts found.</div>
        ) : (
          <div>
            {posts.map(post => (
              <div key={post.id} className="bg-white p-4 rounded-md shadow-md mb-4">
                <p className="text-lg font-semibold mb-2">{post.content}</p>
                <p className="text-gray-600 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};
