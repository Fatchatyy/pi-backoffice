import React, { useEffect, useState } from 'react'
import './LeftNav.css'


const LeftNav = ({ selectedEmployee }) => {
  const [empById, setEmpById] = useState([])

if(selectedEmployee){
console.log("selectedemploye",selectedEmployee)

}
  return (
    <nav className='leftNav'>
      <div className="employeeDetail">
        <h2>Full Detail</h2>
        {selectedEmployee ? (
          <>
            <img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="employeeImage" />
            <h1>{selectedEmployee.name}</h1>
            <p>Description: {selectedEmployee.profile.description}</p>
            <p>Looking for: {selectedEmployee.profile.job_type}</p>
            <p> {selectedEmployee.mail}</p>
            <p>Diploma: {selectedEmployee.profile.diploma_name}</p>
            <p>School: {selectedEmployee.profile.school}</p>
             {/* Display each project on a new line */}
             <div>
              <h3>Projects:</h3>
              {selectedEmployee.profile.projects.map((project, index) => (
                <p key={index}>
                  <strong>{project.name}</strong>: {project.description}
                </p>
              ))}
            </div>
            
            {/* Display skills in the same row, separated by commas */}
            <p>Skills: {selectedEmployee.profile.skills.join(', ')}</p>
            <p className='date'>Experience: {selectedEmployee.profile.work_experience}</p>
            <p>Language: {selectedEmployee.profile.languages}</p>
            <p>location: {selectedEmployee.profile.location}</p>
            {/* Display hobbies in the same row, separated by commas */}
            <p>Hobbies: {selectedEmployee.profile.hobbies.map(hobby => hobby.name).join(', ')}</p>


           


          </>
        ) : (
          <p>No employee selected</p>
        )}
      </div>
    </nav>
  )
}

export default LeftNav
