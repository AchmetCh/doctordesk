import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './NavBar';
import './NewPatientForm.css';

const NewPatientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    SSN: '',
    symptoms: '',
    allergies: '',
    medications: '',
    disease_history: '',
    diagnosis: '',
    other: ''
  });

  const navigate = useNavigate();
  const ToastSuccessful = () => toast("Patient created Successfully!");
  const ToastNotCreated = () => toast("Patient Failed to create!");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const apiUrl = 'http://localhost:8000';
  const apiOnline = 'https://doctordesk.onrender.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiOnline}/api/create`, formData);
      if (response.status === 201) {
        ToastSuccessful();
        navigate('/searchPatient');
      }
    } catch (error) {
      console.error(error);
      ToastNotCreated();
    }
  };

  return (
    <div className="form-container">
      <ToastContainer /> {/* Toast mesajlarını göstermek için ToastContainer bileşeni */}
      <div className="form-card">
        <div className="form-header">Create New Patient</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Name" 
              required 
            />
          </div>
          <div>
            <label htmlFor="surname">Surname</label>
            <input 
              type="text" 
              name="surname" 
              value={formData.surname} 
              onChange={handleChange} 
              placeholder="Surname" 
              required 
            />
          </div>
          <div>
            <label htmlFor="ssn">SSN</label>
            <input 
              type="text" 
              pattern="[0-9]*" /* only numbers input */
              maxLength={10}
              name="SSN" 
              value={formData.SSN} 
              onChange={handleChange} 
              placeholder="SSN" 
              required 
            />
          </div>
          <div className="form-grid">
            <div>
              <label htmlFor="symptoms">Symptoms</label>
              <textarea 
                name="symptoms" 
                value={formData.symptoms} 
                onChange={handleChange} 
                placeholder="Symptoms"
              />
            </div>
            <div>
              <label htmlFor="allergies">Allergies</label>
              <textarea 
                name="allergies" 
                value={formData.allergies} 
                onChange={handleChange} 
                placeholder="Allergies"
              />
            </div>
            <div>
              <label htmlFor="medications">Medications</label>
              <textarea 
                name="medications" 
                value={formData.medications} 
                onChange={handleChange} 
                placeholder="Medications"
              />
            </div>
            <div>
              <label htmlFor="disease_history">Disease History</label>
              <textarea 
                name="disease_history" 
                value={formData.disease_history} 
                onChange={handleChange} 
                placeholder="Disease History"
              />
            </div>
            <div>
              <label htmlFor="diagnosis">Diagnosis</label>
              <textarea 
                name="diagnosis" 
                value={formData.diagnosis} 
                onChange={handleChange} 
                placeholder="Diagnosis"
              />
            </div>
            <div>
              <label htmlFor="other">Other</label>
              <textarea 
                name="other" 
                value={formData.other} 
                onChange={handleChange} 
                placeholder="Other"
              />
            </div>
          </div>
          <button type="submit">Create Patient</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewPatientForm;
