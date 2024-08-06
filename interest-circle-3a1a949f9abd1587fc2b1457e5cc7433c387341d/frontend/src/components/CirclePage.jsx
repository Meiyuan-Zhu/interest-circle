import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CirclePage.css';

const CirclePage = ({ username }) => {
  const { circleId } = useParams();
  const [circle, setCircle] = useState(null); // 修改这一行，删除了错误的结构语法
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);

  useEffect(() => {
    fetchCircleDetails();
    fetchPosts();
  }, []);

  const fetchCircleDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:7001/api/circles/${circleId}`);
      setCircle(response.data);
    } catch (error) {
      console.error('Error fetching circle details:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:7001/api/circles/${circleId}/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const addPost = async () => {
    const formData = new FormData();
    formData.append('content', newPostContent);
    formData.append('username', username);
    formData.append('circleid', circleId);
    if (newPostImage) {
      formData.append('image', newPostImage);
    }

    try {
      const response = await axios.post(`http://localhost:7001/api/circles/${circleId}/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setNewPostContent('');
      setNewPostImage(null);
      fetchPosts();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="circle-detail-container">
      {circle && (
        <>
          <h2>{circle.name}</h2>
          <p>{circle.description}</p>
          <p>Created by {circle.createdBy} on {new Date(circle.createdAt).toLocaleDateString()}</p>
        </>
      )}
      <div className="posts-section">
        {posts.map((post) => (
          <div key={post._id} className="post">
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt="Post" />}
            <p>Posted by {post.username} on {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <div className="new-post-section">
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Write your post here"
        />
        <input
          type="file"
          onChange={(e) => setNewPostImage(e.target.files[0])}
        />
        <button onClick={addPost}>Add Post</button>
      </div>
    </div>
  );
};

export default CirclePage;
