import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './InterestCircle.css';

const InterestCircle = () => {
    const [circles,setCircles] = useState([]);

    useEffect(() => {
        // Fetch interest circles from the backend
        fetch('/api/interest-circles')
        .then(response => response.json())
        .then(data => setCircles(data))
        .catch(error => console.error('Error fetching interest circles:', error));
    },[]);

    return (
        <div className="interest-circles">
            <header>
                <h1>Interest Circles</h1>
            </header>

            < Link to="/create-circle" className="add-circle">Click to create your interest circle!</Link>

            <div className="circles-container">
                {circles.map(circle => (
                    <div key= {circle.id} className="circle-card">
                        <h2>{circle.name}</h2>
                        <p>{circle.description}</p>
                        <p>{circle.createdby}</p>
                    </div>
                ))}
            </div>
            

        </div>
    )
};

export default InterestCircle;