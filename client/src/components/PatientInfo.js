//update, delete, onChange, display all patient info
//patient info: name, surname, SSN, symptoms, allergies, disease history, medications, diagnosis, other

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import Layout from "./Layout";
import axios from "axios";

function PatientInfo() {
  const location = useLocation()
  const patient = location.state?.patient; //get patient info from patient list page
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    surname: "",
    SSN: "",
    symptoms: "",
    allergies: "",
    diseaseHistory: "",
    medications: "",
    diagnosis: "",
    other: "",
  });



  useEffect(() => {
    const fetchPatientInfo = async () =>{
    try {
      const res = await axios.get(`/update/${patientInfo.SSN}`)
        setPatientInfo(res.data);
    } catch (error) {
      console.log('Patient not found');
    }
}
    fetchPatientInfo()
  }, [patientInfo.SSN]);




  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatientInfo((prevPatientInfo) => ({
      ...prevPatientInfo,
      [name]: value,
    }));
  };




  const handleUpdate = async () => {
    try {
       await axios.put(`/update/${patientInfo.SSN}`, patientInfo)
        console.log("Patient info updated successfully");
    } catch (error) {
      console.log('Update not successful');
    }
  };




  const handleDelete = async () => {
    try {
       await axios.delete(`/delete/${patientInfo.SSN}`)
        console.log("Patient info deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <div className="container">
      <div className="first-card-info">
        <form>
          <label className="patient-name">
            Name: 
            <input
              type="text"
              name="name"
              value={patientInfo.name}
              onChange={handleInputChange}
            />
          </label>

          <label className="patient-surname">
            Surname:
            <input
              type="text"
              name="surname"
              value={patientInfo.surname}
              onChange={handleInputChange}
            />
          </label>
          <label className="patient-ssn">
            SSN:
            <input
              type="text"
              name="SSN"
              value={patientInfo.SSN}
              onChange={handleInputChange}
            />
          </label>

          <h1 className="h1-patient-med">PATIENT MEDICAL INFORMATION</h1>
      <div className="second-card-info">
          <label className="patient-symptoms">
            Symptoms:
            <textarea
              name="symptoms"
              value={patientInfo.symptoms}
              onChange={handleInputChange}
            />
          </label>
          <label className="patient-allergies">
            Allergies:
            <textarea
              name="allergies"
              value={patientInfo.allergies}
              onChange={handleInputChange}
            />
          </label>
          <label className="patient-disease-history">
            Disease History:
            <textarea
              name="diseaseHistory"
              value={patientInfo.diseaseHistory}
              onChange={handleInputChange}
            />
          </label>
          <label className="patient-medications">
            Medications:
            <textarea
              name="medications"
              value={patientInfo.medications}
              onChange={handleInputChange}
            />
          </label>
          <label className="patient-diagnosis">
            Diagnosis: 
            <textarea
              name="diagnosis"
              value={patientInfo.diagnosis}
              onChange={handleInputChange}
            />
          </label>
          <label className="patient-other">
            Other: 
            <textarea
              name="other"
              value={patientInfo.other}
              onChange={handleInputChange}
            />
          </label>
          </div>
          <button className="update-btn" onClick={handleUpdate}>
            UPDATE
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            DELETE
          </button>
        </form>
      </div>
    </div>
  );
}

export default PatientInfo;
