import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notifications.css';

const Notifications = ({ username }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:7001/api/circles/${username}/notifications`);
      console.log('Notifications response:', response.data);
      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (index) => {
    const notificationId = notifications[index]._id;
    try {
        await axios.put(`http://localhost:7001/api/circles/${username}/notifications/${notificationId}/read`);
        const updatedNotifications = [...notifications];
        updatedNotifications[index].read = true;
        setNotifications(updatedNotifications);
    } catch (error) {
        console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className={notification.read ? 'read' : 'unread'}>
            {notification.message}
            {!notification.read && (
              <button onClick={() => markAsRead(index)}>Mark as Read</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
