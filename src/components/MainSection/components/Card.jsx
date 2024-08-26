import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios'; // Ensure you have axios or your preferred HTTP client
import api, { setAuthToken } from '../../../axiosServices'; 
import InterviewM from "../../ModelPopup/InterviewM";

const Card = ({postId,hrId ,  token, status, empData, handleReRender }) => {
  const { name, mail, avatar } = empData;
  const [dropDown, setDropdown] = useState(false);
  const [applicantsId, setApplicatsId] = useState();
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  useEffect(() => {
    setApplicatsId(empData.profile.user_id);
  }, [empData]);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'on hold':
        return 'status on-hold';
      case 'accepted':
        return 'status accepted';
      case 'declined':
        return 'status declined';
      default:
        return 'status'; // Default class if needed
    }
  };

  const handleAccept = () => handleStatusUpdate(applicantsId, 'accepted');
  const handleDecline = () => handleStatusUpdate(applicantsId, 'declined');

  const handleStatusUpdate = async (applicantsId, newStatus) => {
    setAuthToken(token); 
    try {
      const response = await api.post('/update-status', {
        applicantsId,
        newStatus
      });
      return response.data;
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  };

  const handleScheduleInterview = () => {
    console.log("showmodej",showModal)
    setShowModal(true); // Show modal when button is clicked
    console.log("showmodej1",showModal)
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="card-component">
      <div className="card-inner">
        <div className="dropdownContainer">
          <BsThreeDotsVertical size={20} onClick={() => setDropdown(!dropDown)} />
          {dropDown && (
            <ul className="dropdown" onMouseLeave={() => setDropdown(false)}>
              <li>Edit</li>
              <li>Delete</li>
            </ul>
          )}
        </div>
        <div className="profileImage">
          <img src={avatar} alt={name} />
        </div>
        <div className="emp-detail">
          <div className="flex items-center">
            <span className={getStatusClass(status)}></span>
            <p className="ml-2">{status}</p>
          </div>
          <h3>{name}</h3>
          <p>{mail}</p>
        </div>
      </div>
      <div className="actions">
        <button className="accept-btn" onClick={() => handleAccept('accepted')}>
          Accept
        </button>
        <button className="decline-btn" onClick={() => handleDecline('declined')}>
          Decline
        </button>
        <button className="schedule-btn" onClick={handleScheduleInterview}>
          Schedule Interview
        </button>
      </div>

      {/* Conditionally render the InterviewModal */}
      {showModal && (
        <InterviewM
        postId ={postId}
          jobSeekerId={empData.profile.user_id}
          hrId={hrId}
          isOpen={showModal}
          setShowModal={closeModal}
          empData={empData}
        />
      )}
    </div>
  );
};

export default Card;
