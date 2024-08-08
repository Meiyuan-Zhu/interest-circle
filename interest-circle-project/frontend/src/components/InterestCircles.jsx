import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './InterestCircles.css';
import { useNavigate } from 'react-router-dom';
import { logout } from './authService';

Modal.setAppElement('#root');
const InterestCircles = () => {
  const [circles, setCircles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCircleName, setNewCircleName] = useState('');
  const [newCircleDescription, setNewCircleDescription] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const username = localStorage.getItem('username');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCircles();
  }, [page]);

  const fetchCircles = async () => {
    try {
      const response = await axios.get(`http://localhost:7001/api/circles?page=${page}&limit=10`);
      console.log('Fetched circles:', response.data);
      if (response.data && Array.isArray(response.data.circles)) {
        setCircles(response.data.circles);
        setTotalPages(response.data.totalPages);
      } else {
        console.error('Fetched data is not an array', response.data);
      }
    } catch (error) {
      console.error('Error fetching circles:', error);
    }
  };

  const addCircle = async () => {
    const formData = new FormData();
    formData.append('name', newCircleName);
    formData.append('description', newCircleDescription);
    formData.append('createdBy', username); 
    formData.append('createdAt', new Date().toISOString());
    

    try {
      const response = await axios.post('http://localhost:7001/api/circles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        fetchCircles();
        closeModal();
      }
    } catch (error) {
      console.error('Error adding circle:', error);
    }
  };

  const searchCircles = async () => {
    try {
      const response = await axios.get(`http://localhost:7001/api/circles/search?term=${searchTerm}`);
      if (Array.isArray(response.data)) {
        setCircles(response.data);
      } else {
        console.error('Search result is not an array', response.data);
      }
    } catch (error) {
      console.error('Error searching circles:', error);
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setNewCircleName('');
    setNewCircleDescription('');
    setNewCircleImage(null);
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  const handleCardClick = (circleId) => {
    navigate(`/circle/${circleId}`);
  };

  return (
    <div className="interest-circles-container">
      <button className='log-out-button' onClick={logout}>Log out</button>
      <h2 className="title">Hi {username}, welcome to Interest Circles!</h2>
      <button className='add-button' onClick={() => setModalIsOpen(true) }>Create Your Circle</button>
      
      <div className="input-group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search interest circles"
          className='search-input'
        />
        <button onClick={searchCircles} className='search-button'>Search</button>
      </div>
      <div className="circles-list">
        {circles.map((circle) => (
          <div className="circle-card" key={circle._id} onClick={() => handleCardClick(circle._id)}>
            <div className="circle-info">
              <h3 className="circle-name">{circle.name}</h3>
              <p className="circle-description">{circle.description}</p>
              <p className="circle-meta">Created by {circle.createdBy} on {new Date(circle.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={page === 1} className='previous-button'>👈</button>
        <span className='page-number'>Page {page} of {totalPages}</span>
        <button onClick={goToNextPage} disabled={page === totalPages} className='next-button'>👉</button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Circle"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className='add-title'>Create New Circle</h2>
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
          <button onClick={addCircle} className='submit-button'>Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export default InterestCircles;
