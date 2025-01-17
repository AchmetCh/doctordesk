import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../../src/components/PatientInfo.css";

function PatientInfo() {
  const navigate = useNavigate();
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
  const apiUrl = "http://localhost:8000";
  const apiOnline = "https://doctordesk.onrender.com";
  const ToastSuccessful = () => toast("Update Successful!");
  const DeleteSuccessful = () => toast("Delete Successful!");
  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const res = await axios.get(`${apiOnline}/api/search/${ssn}`);
        setPatientInfo(res.data);
        console.log(res.data);
      } catch (error) {
        console.log("Patient not found");
      }
    };
    fetchPatientInfo();
  }, [ssn]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatientInfo((prevPatientInfo) => ({
      ...prevPatientInfo,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `${apiOnline}/api/update/${patientInfo.SSN}`,
        patientInfo
      );
      console.log("Patient info updated successfully");
      ToastSuccessful();
      setTimeout(() => {
        navigate("/searchpatient");
      }, 1000); 
      // setTimeout(() => (window.location.href = "/searchPatient"), 1000);
    } catch (error) {
      console.log("Update not successful");
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await axios.delete(`${apiOnline}/api/delete/${patientInfo.SSN}`);
      console.log("Patient info delete successfully");
      DeleteSuccessful();
      setTimeout(() => {
        navigate("/searchpatient");
      }, 1000); 
      // setTimeout(() => (window.location.href = "/searchpatient"), 1000);
    } catch (error) {
      console.log("Delete not successful");
    }
  };

  return (
    <div className="container">
      <form>
        <header className="first-card-info">
          <div className="patient-name">
            NAME:
            <br />
            <input
              className="patient-name-input input"
              type="text"
              name="name"
              value={patientInfo.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="patient-surname">
            SURNAME:
            <br />
            <input
              className="patient-surname-input input"
              type="text"
              name="surname"
              value={patientInfo.surname}
              onChange={handleInputChange}
            />
          </div>
          <div className="patient-ssn">
            SSN:
            <br />
            <input
              className="patient-ssn-input input"
              type="text"
              name="SSN"
              value={patientInfo.SSN}
              onChange={handleInputChange}
            />
          </div>
        </header>
      </form>

      <h1 className="h1-patient-med">PATIENT MEDICAL INFORMATION</h1>

      <form>
        <main className="second-card-info">
          <div className="patient-symptoms">
            SYMPTOMS:
            <textarea
              name="symptoms"
              value={patientInfo.symptoms}
              onChange={handleInputChange}
            />
          </div>
          <div className="patient-allergies">
            ALLERGIES:
            <textarea
              name="allergies"
              value={patientInfo.allergies}
              onChange={handleInputChange}
            />
          </div>
          <div className="patient-disease-history">
            DISEASE HISTORY:
            <textarea
              name="diseasehistory"
              value={patientInfo.diseasehistory}
              onChange={handleInputChange}
            />
          </div>
          <div className="patient-medications">
            MEDICATIONS:
            <textarea
              name="medications"
              value={patientInfo.medications}
              onChange={handleInputChange}
            />
          </div>
          <div className="patient-diagnosis">
            DIAGNOSIS:
            <textarea
              name="diagnosis"
              value={patientInfo.diagnosis}
              onChange={handleInputChange}
            />
          </div>
          <div className="patient-other">
            OTHER:
            <br />
            <textarea
              name="other"
              value={patientInfo.other}
              onChange={handleInputChange}
            />
          </div>
        </main>
      </form>

      <button className="update-btn" onClick={handleUpdate}>
        UPDATE
      </button>
      <button className="delete-btn" onClick={handleDelete}>
        DELETE
      </button>

      <ToastContainer />
    </div>
  );
}

export default PatientInfo;
