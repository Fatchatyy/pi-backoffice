import React, { useState, useEffect } from "react";
import "./ModelPopup.css";
import { useFormik } from 'formik';
import axios from 'axios'; // Ensure axios is installed or use your preferred HTTP client
import api, { setAuthToken } from '../../axiosServices';
const InterviewM = ({ postId,jobSeekerId,hrId,setShowModal, token, applicantId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log("Modal is appearing");
  }, []);

  const validateDate = (date) => {
    const today = new Date();
    const selectedDate = new Date(date);
    return selectedDate >= today;
  };

  const formik = useFormik({
    initialValues: {
      interviewDate: '',
      notes: '',
    },
    onSubmit: async (values) => {
      if (!validateDate(values.interviewDate)) {
        setError('Please choose a date that is not before today.');
      } else {
        setError('');
        setLoading(true);
        console.log("hello",postId,jobSeekerId,hrId, values.interviewDate, values.notes)
        try {
          const response = await api.post('/schedule-interview', { postId,jobSeekerId,hrId,interviewDate: values.interviewDate,notes: values.notes});

          console.log('Interview scheduled successfully:', response.data);
          setShowModal(false); // Close the modal after success
        } catch (error) {
          console.error('Error scheduling interview:', error);
          setError('Failed to schedule the interview. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    },
  });

  return (
    <div className="modalContainer">
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="modalBox">
          <div className="modalHeader">
            <h2>Schedule Interview</h2>
          </div>

          <div className="modalInner">
            <div className="input-box">
              <label htmlFor="interviewDate">Interview Date</label>
              <input
                type="date"
                name="interviewDate"
                required
                onChange={formik.handleChange}
                value={formik.values.interviewDate}
              />
            </div>

            <div className="input-box">
              <label htmlFor="notes">Notes</label>
              <textarea
                name="notes"
                rows="4"
                onChange={formik.handleChange}
                value={formik.values.notes}
              />
            </div>

            {error && <p className="error">{error}</p>}

            <div className="modalFooter">
              <button className="add-btn" type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Schedule Interview'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InterviewM;
