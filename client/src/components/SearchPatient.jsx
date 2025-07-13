import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './searchpatient.css';
import api from '../Api'; // Adjust the import path as necessary

const SearchPatient = () => {
  const [ssn, setSsn] = useState('');
  const [patient, setPatient] = useState(null);
  const [allPatients, setAllPatients] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (ssn.trim()) {
      try {
        const res = await axios.get(`${api}/api/search/${ssn}`);
        if (res.data) {
          setPatient(res.data);
          navigate(`/patient/${ssn}`);
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
    navigate(`/patient/${ssn}`);
  };
  const NewPatient = () => {
    navigate(`/createpatient/`);
  };

  const fetchAllPatients = async () => {
    try {
      const res = await axios.get(`${api}/api/patient`);
      setAllPatients(res.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      alert('Error fetching patients');
    }
  };

  useEffect(() => {
    fetchAllPatients();
  }, []);

  return (
    <div className='body'>
      <section className='search-section'>
      <input
        type="text"
        placeholder="Search SSN..."
        value={ssn}
        onChange={(e) => setSsn(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {handleSearch() } // Trigger search on Enter key
        }}
      />
      <button className='searchBtn' onClick={handleSearch}>Search</button>
      <button className='newpatientBtn' onClick={NewPatient}>+New Patient</button>
      </section>
      <main>
      {patient && (
        <div>
          <div onClick={() => handleRowClick(patient.SSN)} className="searchbox">
            <p>SSN: {patient.SSN}</p>
            <p>Name: {patient.name}</p>
            <p>Surname: {patient.surname}</p>
          </div>
        </div>
      )}
      <div>
        <h2>All Patients:</h2>
        <table className="table">
          <thead>
            <tr>
              <th>SSN</th>
              <th>Name</th>
              <th>Surname</th>
            </tr>
          </thead>
          <tbody>
            {allPatients.map((patient) => (
              <tr key={patient.SSN} onClick={() => handleRowClick(patient.SSN)} className="tabletd">
                <td>{patient.SSN}</td>
                <td>{patient.name}</td>
                <td>{patient.surname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </main>
    </div>
  );
};

export default SearchPatient;

