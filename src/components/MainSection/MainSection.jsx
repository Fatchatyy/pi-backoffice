import React, { useEffect, useState } from "react";
import "./MainSection.css";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Card from "./components/Card";
import api, { setAuthToken } from '../../axiosServices'; // Import the Axios instance and setAuthToken function
import ModelPopup from "../ModelPopup/ModelPopup";
import LeftNav from "../LeftNav/LeftNav";

const MainSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null); // To store the selected employee details
  const [token,setToken] = useState(null);
  const [userId ,setUserId] = useState();
  useEffect(() => {
    const fetchToken = async () => {
      // Extract token from URL parameters and store it in localStorage
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get('token');
      setUserId(userId);
      if (userId) {
        const response = await api.get(`/retrieve-token`, { params: { userId } });
        const tokenFromBackend = response.data.token; 
        setAuthToken(tokenFromBackend); // Set token in Axios instance
        setToken(tokenFromBackend);

        const fetchApplicants = async () => {
          try {
            const response = await api.get('/applicants', { params: { userId } });
            console.log("the response", response.data)
            setPosts(response.data); // Set posts with their applicants
          } catch (error) {
            console.error('Error fetching applicants:', error);
          }
        };

        fetchApplicants();
      }
    }
    fetchToken();
  }, []);

  // Handle search
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };
  const handleClick = () => {
    window.location.href = 'http://localhost:3030/auth'; // Replace with your backend URL
    
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.applicants.some((applicant) =>
      `${applicant.user.name} ${applicant.user.mail}`.toLowerCase().includes(searchQuery)
    )
  );

  return (
    <>
      {showModal && <ModelPopup setShowModal={setShowModal} />}

      <main className="mainContainer">
        <div className="mainWrapper">
          <h1>
            Posts <span className="emp-count">{posts.length}</span>
          </h1>
          <div className="employeeHeader">
            <div className="searchBox">
              <input
                type="text"
                placeholder="Search by applicant name, email, etc."
                onChange={handleSearch}
              />
              <BiSearch size={20} />
            </div>
            <button className="add-btn" onClick={() => setShowModal(true)}>
              <IoMdAdd size="20" color="#ffffff" /> Add Applicant {/* Optional button depending on your need */}
            </button>
            <button onClick={handleClick}>
      Connect to Google Calendar
    </button>
          </div>
          <div className="employees">
            {filteredPosts.map((post) => (
              <div key={post._id} className="post">
                {/* Post Content and Job Type */}
                <div className="post-details">
                  <h2>{post.content}</h2>
                  <p>Job Type: {post.jobType}</p>
                  <p>Company: {post.company}</p>
                </div>
                
                {/* Applicants Section */}
                <div className="applicants-section1">
                  <h3>Applicants:<span>{post.applicants.length}</span></h3>
                  <div className="applicants-section">
                    {post.applicants.length > 0 ? (
                      post.applicants.map((applicant) => (
                        <div key={applicant.user._id} onClick={() => setSelectedEmployee(applicant.user)}>
                          <Card
                          postId={post._id}
                          hrId={userId}
                          token ={token}
                            status={applicant.status}
                            empData={applicant.user} // Pass applicant data to the card
                            handleEdit={() => setEditModal(true)}
                            handleReRender={() => {}}
                          />
                        </div>
                      ))
                    ) : (
                      <p>No applicants for this post.</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pass the selected employee data to LeftNav */}
        <LeftNav selectedEmployee={selectedEmployee} />
      </main>
    </>
  );
};

export default MainSection;
