import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function PatientInfo() {
  const { ssn } = useParams();
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    surname: "",
    SSN: "",
    symptoms: "",
    allergies: "",
    diseasehistory: "",
    medications: "",
    diagnosis: "",
    other: "",
  });
  const apiUrl = 'http://localhost:8000';
  const ToastSuccessful = () => toast("Update Successful!");

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/search/${ssn}`);
        setPatientInfo(res.data);
        console.log((res.data));
      } catch (error) {
        console.log('Patient not found');
      }
    };
    fetchPatientInfo();
  }, [ssn]);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setPatientInfo((prevPatientInfo) => ({
  //     ...prevPatientInfo,
  //     [name]: value,
  //   }));
  // };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatientInfo((prevPatientInfo) => ({
     ...prevPatientInfo,
      [name]: event.target.type === 'textarea'? event.target.value.trim() : value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${apiUrl}/api/update/${patientInfo.SSN}`, patientInfo);
      console.log("Patient info updated successfully");
      ToastSuccessful()
      setTimeout(() => window.location.href = '/searchPatient', 1000);
    } catch (error) {
      console.log('Update not successful');
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await axios.delete(`${apiUrl}/api/delete/${patientInfo.SSN}`);
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
              name="diseasehistory"
              value={patientInfo.diseasehistory}
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
          <button className="update-btn" onClick={handleUpdate}>
            UPDATE
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            DELETE
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default PatientInfo;

