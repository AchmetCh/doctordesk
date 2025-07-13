import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './NavBar';
import './NewPatientForm.css';
import api from '../Api';

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

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const ToastSuccessful = () => toast.success("Patient created successfully!", {
    position: "top-right",
    autoClose: 3000,
  });
  
  const ToastNotCreated = () => toast.error("Failed to create patient!", {
    position: "top-right",
    autoClose: 3000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${api}/api/create`, formData);
      if (response.status === 201) {
        ToastSuccessful();
        setTimeout(() => navigate('/searchPatient'), 2000);
      }
    } catch (error) {
      console.error(error);
      ToastNotCreated();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className={`form-card ${isLoading ? 'loading' : ''}`}>
        <div className="form-header">Create New Patient</div>
        
        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="personal-info">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name"
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter patient's name" 
                required 
              />
            </div>
            
            <div className="form-field">
              <label htmlFor="surname">Surname</label>
              <input 
                type="text" 
                id="surname"
                name="surname" 
                value={formData.surname} 
                onChange={handleChange} 
                placeholder="Enter patient's surname" 
                required 
              />
            </div>
            
            <div className="form-field">
              <label htmlFor="ssn">Social Security Number</label>
              <input 
                type="text" 
                id="ssn"
                pattern="[0-9]*"
                maxLength={11}
                name="SSN" 
                value={formData.SSN} 
                onChange={handleChange} 
                placeholder="Enter 11-digit SSN" 
                required 
              />
            </div>
          </div>

          {/* Medical Information Section */}
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="symptoms">Symptoms</label>
              <textarea 
                id="symptoms"
                name="symptoms" 
                value={formData.symptoms} 
                onChange={handleChange} 
                placeholder="Describe patient's symptoms..."
              />
            </div>
            
            <div className="form-field">
              <label htmlFor="allergies">Allergies</label>
              <textarea 
                id="allergies"
                name="allergies" 
                value={formData.allergies} 
                onChange={handleChange} 
                placeholder="List known allergies..."
              />
            </div>
            
            <div className="form-field">
              <label htmlFor="medications">Current Medications</label>
              <textarea 
                id="medications"
                name="medications" 
                value={formData.medications} 
                onChange={handleChange} 
                placeholder="List current medications..."
              />
            </div>
            
            <div className="form-field">
              <label htmlFor="disease_history">Disease History</label>
              <textarea 
                id="disease_history"
                name="disease_history" 
                value={formData.disease_history} 
                onChange={handleChange} 
                placeholder="Enter medical history..."
              />
            </div>
            
            <div className="form-field">
              <label htmlFor="diagnosis">Diagnosis</label>
              <textarea 
                id="diagnosis"
                name="diagnosis" 
                value={formData.diagnosis} 
                onChange={handleChange} 
                placeholder="Enter diagnosis..."
              />
            </div>
            
            <div className="form-field">
              <label htmlFor="other">Additional Information</label>
              <textarea 
                id="other"
                name="other" 
                value={formData.other} 
                onChange={handleChange} 
                placeholder="Any other relevant information..."
              />
            </div>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Patient...' : 'Create Patient'}
          </button>
        </form>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default NewPatientForm;