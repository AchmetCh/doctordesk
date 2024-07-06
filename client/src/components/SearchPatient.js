// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const SearchPatient = () => {
//   const [ssn, setSsn] = useState('');
//   const navigate = useNavigate();
//   const apiUrl = 'http://localhost:8000';
//   const handleSearch = async () => {
//     if (ssn) {
//       try {
//         const res = await axios.get(`${apiUrl}/api/search/${ssn}`);
//         if (res.data) {
//           navigate(`/edit-patient/${ssn}`);
//         } else {
//           alert('Patient not found');
//         }
//       } catch (error) {
//         console.error('Error fetching patient:', error);
//         alert('Error fetching patient');
//       }
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search SSN..."
//         value={ssn}
//         onChange={(e) => setSsn(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>
//     </div>
//   );
// };

// export default SearchPatient;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchPatient = () => {
  const [ssn, setSsn] = useState('');
  const [patient, setPatient] = useState(null);
  const [allPatient, setAllPatient] = useState(null)
  const apiUrl = 'http://localhost:8000';

  const handleSearch = async () => {
    if (ssn) {
      try {
        const res = await axios.get(`${apiUrl}/api/search/${ssn}`);
        if (res.data) {
          setPatient(res.data);
        } else {
          alert('Patient not found');
        }
      } catch (error) {
        console.error('Error fetching patient:', error);
        alert('Error fetching patient');
      }
    }
  };
  const handleRowClick = (ssn) => {
    // navigate(`/edit-patient/${ssn}`);
    console.log(ssn)
  };
  const getAllPatient = async() => {
    try {
        const res = await axios.get(`${apiUrl}/api/patient`)
            setAllPatient(res.data)
            } catch (error) {
                console.error('Error fetching patient:', error);
                alert('Error fetching patient');
  }
}
useEffect(() => {
    getAllPatient()
},[])

useEffect(() => {
    if (allPatient) {
      console.log(allPatient);
    }
  }, [allPatient]);
  return (
    <div>
      <input
        type="text"
        placeholder="Search SSN..."
        value={ssn}
        onChange={(e) => setSsn(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {patient && (
        <div>
          <h2>Patient Found:</h2>
          <div onClick={()=> handleRowClick(patient.SSN)}>
          <p>SSN: {patient.surname}</p>
          <p>Name: {patient.name}</p>
          <p>SSN: {patient.SSN}</p>
          {/* Add more patient details here */}
          </div>
        </div>
      )}
      <div>
        <div>
            <h2>All Patients:</h2>
            <table className='table'>
            <thead>
                <tr>
                    <th>SSN</th>
                    <th>Name</th>
                    <th>Surname</th>
                </tr>
                </thead>
                {allPatient && allPatient.map((patient) => (
                    <tbody>
                    <tr key={patient.SSN} onClick={() => handleRowClick(patient.SSN)}> 
                        <td>{patient.SSN}</td>
                        <td>{patient.name}</td>
                        <td>{patient.surname}</td>  
                    </tr>
                    </tbody>
                    ))}
            </table>
        </div>

      </div>
    </div>
  );
};

export default SearchPatient;
