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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/create', formData);
      if (response.status === 201) {
        toast.success('Patient created successfully');
        navigate('/searchPatient');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create patient');
    }
  };

  return (
    <div className="form-container">
      <ToastContainer /> {/* Toast mesajlarını göstermek için ToastContainer bileşeni */}
      <div className="form-card">
        <h1>Create New Patient</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
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
            <label>Surname</label>
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
            <label>SSN</label>
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
              <label>Symptoms</label>
              <textarea 
                name="symptoms" 
                value={formData.symptoms} 
                onChange={handleChange} 
                placeholder="Symptoms"
              />
            </div>
            <div>
              <label>Allergies</label>
              <textarea 
                name="allergies" 
                value={formData.allergies} 
                onChange={handleChange} 
                placeholder="Allergies"
              />
            </div>
            <div>
              <label>Medications</label>
              <textarea 
                name="medications" 
                value={formData.medications} 
                onChange={handleChange} 
                placeholder="Medications"
              />
            </div>
            <div>
              <label>Disease History</label>
              <textarea 
                name="disease_history" 
                value={formData.disease_history} 
                onChange={handleChange} 
                placeholder="Disease History"
              />
            </div>
            <div>
              <label>Diagnosis</label>
              <textarea 
                name="diagnosis" 
                value={formData.diagnosis} 
                onChange={handleChange} 
                placeholder="Diagnosis"
              />
            </div>
            <div>
              <label>Other</label>
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
    </div>
  );
};

export default NewPatientForm;
