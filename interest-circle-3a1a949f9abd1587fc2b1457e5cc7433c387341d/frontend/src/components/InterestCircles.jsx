import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './InterestCircles.css';

Modal.setAppElement('#root');

const InterestCircles = () => {
  const [circles, setCircles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCircleName, setNewCircleName] = useState('');
  const [newCircleDescription, setNewCircleDescription] = useState('');
  const [newCircleImage, setNewCircleImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchCircles();
    setUsername(localStorage.getItem('username') || 'User');
  }, []);

  const fetchCircles = async () => {
    try {
      const response = await axios.get('/api/circles');
      if (Array.isArray(response.data)) {
        setCircles(response.data);
      } else {
        console.error('Error: response.data is not an array', response.data);
      }
    } catch (error) {
      console.error('Error fetching circles:', error);
    }
  };

  const addCircle = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newCircleName);
      formData.append('description', newCircleDescription);
      formData.append('createdBy', username); 
      formData.append('createdAt', new Date().toISOString());
      formData.append('image', newCircleImage);

      const response = await axios.post('/api/circles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        fetchCircles();
        setNewCircleName('');
        setNewCircleDescription('');
        setNewCircleImage(null);
        setModalIsOpen(false); 
      }
    } catch (error) {
      console.error('Error adding circle:', error);
    }
  };

  const searchCircles = async () => {
    try {
      const response = await axios.get(`/api/circles/search?term=${searchTerm}`);
      if (Array.isArray(response.data)) {
        setCircles(response.data);
      } else {
        console.error('Error: response.data is not an array', response.data);
      }
    } catch (error) {
      console.error('Error searching circles:', error); 
    }
  };

  return (
    <div className="interest-circles-container">
      <h2 className="title">Hi {username}, welcome to Interest Circles!</h2>
      <button className='add-button' onClick={() => setModalIsOpen(true) }>Create Your Circle</button>
      <div className="input-group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search interest circles"
        />
        <button onClick={searchCircles} className='search-button'>Search</button>
      </div>
      <ul>
        {circles.map((circle) => (
          <li key={circle._id}>
            <h3>{circle.name}</h3>
            <p>{circle.description}</p>
            {circle.image && <img src={circle.image} alt={circle.name} />}
          </li>
        ))}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Circle"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className='add-title'>Add New Circle</h2>
        <div className="input-group">
          <input
            type="text"
            value={newCircleName}
            onChange={(e) => setNewCircleName(e.target.value)}
            placeholder="Circle Name"
          />
          <input
            type="text"
            value={newCircleDescription}
            onChange={(e) => setNewCircleDescription(e.target.value)}
            placeholder="Circle Description"
          />
         <div className="file-input">
            <input
              type="file"
              id="file"
              onChange={(e) => setNewCircleImage(e.target.files[0])}
            />
            <label htmlFor="file">上传封面图片</label>
          </div>
          <button onClick={addCircle} className='submit-button'>Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export default InterestCircles;
