import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import Chart from 'chart.js/auto'; 
import './CirclePage.css';
import Notifications from './Notifications';
import { logout } from './authService';

Modal.setAppElement('#root');

const CirclePage = () => {
  const { circleId } = useParams();
  const [circle, setCircle] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const username = localStorage.getItem('username');
  const [newCommentContent, setNewCommentContent] = useState('');
  const [userActivityStats, setUserActivityStats] = useState({});
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    fetchCircleDetails();
    fetchPosts();
    fetchUserActivityStats();
    fetchNotifications();
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
      setPosts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
  };

  const fetchUserActivityStats = async () => {
    try {
      const response = await axios.get(`http://localhost:7001/api/circles/${circleId}/user-activity-stats`);
      const stats = response.data.userStats;
      setUserActivityStats(stats);
      if (stats) {
        createChart(stats);
      }
    } catch (error) {
      console.error('Error fetching user activity stats:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:7001/api/circles/${username}/notifications`);
      console.log('Notifications response:', response.data);
      if (response.data.success) {
        setNotifications(response.data.notifications);
      } 
    }catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const createChart = (stats) => {
    const ctx = document.getElementById('userActivityChart').getContext('2d');
    if (Chart.getChart("userActivityChart")) {
      Chart.getChart("userActivityChart").destroy();
    }
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(stats),
        datasets: [
          {
            label: 'Posts',
            data: Object.values(stats).map(stat => stat.posts),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Comments',
            data: Object.values(stats).map(stat => stat.comments),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const addPost = async () => {
    if (!newPostContent.trim()) {
      alert('Post content cannot be empty');
      return;
    }

    const formData = new FormData();
    formData.append('content', newPostContent);
    formData.append('username', username);
    formData.append('circleId', circleId);
    if (newPostImage) {
      formData.append('image', newPostImage);
      console.log('Uploading image:', newPostImage);
    }

    console.log('Form Data:', formData);

    try {
      const response = await axios.post(`http://localhost:7001/api/circles/${circleId}/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Post response:', response.data);
      if (response.data.success) {
        setNewPostContent('');
        setNewPostImage(null);
        setModalIsOpen(false);
        fetchPosts(); 
      } else {
        console.error('Error adding post:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const addComment = async (postId, commentContent) => {
    if (!commentContent.trim()) {
      alert('Comment content cannot be empty');
      return;
    }

    const commentData = {
      username,
      content: commentContent,
    }
    
    console.log(`Adding comment to post ${postId}`,commentData);

    try {
      const response = await axios.post(`http://localhost:7001/api/circles/${circleId}/posts/${postId}/comments`, commentData);
      console.log('Comment response:', response.data);

      if (response.data.success) {
        setNewCommentContent('');
        fetchPosts(); 
      } else {
        console.error('Error adding comment:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

  return (
    <div className="circle-detail-container">
      <button className='log-out-button' onClick={logout}>Log out</button>
      {circle && (
        <>
          <h2>{circle.name}</h2>
          <p>{circle.description}</p>
          <p>Created by {circle.createdBy} on {new Date(circle.createdAt).toLocaleDateString()}</p>
        </>
      )}
      <h3>Member Activity Statistics</h3>
      <canvas id="userActivityChart"></canvas>
      <button onClick={() => setModalIsOpen(true)}>Add a Post</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contentLabel="Create Post">
        <h2>Create New Post</h2>
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Write your post here"
        />
        <input
          type="file"
          onChange={(e) => setNewPostImage(e.target.files[0])}
        />
        <button onClick={addPost}>Submit</button>
      </Modal>
      <Notifications username={username} />
      <div className="posts-section">
        {posts.map((post) => (
          <div key={post._id} className="post">
            <div className='post-content'>
              {post.image && <img className = 'post-image' src={`http://localhost:7001${post.image}`} alt="Post" />}
              <div>
                <p>{post.content}</p>
                <p>Posted by {post.username} on {new Date(post.createdAt).toLocaleDateString()}</p>
                <div className="comments-section">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="comment">
                      <p>{comment.content}</p>
                      <p>Commented by {comment.username} on {new Date(comment.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addComment(post._id, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
     
    </div>
  );
};

export default CirclePage;

