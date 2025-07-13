import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../../src/components/PatientInfo.css";
import api from "../Api"; // Adjust the import path as necessary

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

  const ToastSuccessful = () => toast("Update Successful!");
  const DeleteSuccessful = () => toast("Delete Successful!");
  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const res = await axios.get(`${api}/api/search/${ssn}`);
        setPatientInfo(res.data);
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
      await axios.delete(`${api}/api/delete/${patientInfo.SSN}`);
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
  const AddDateOnClick = () => {
    const today = new Date().toDateString(); // e.g., "7/8/2025"
    const updatedText = `${patientInfo.symptoms}\nDate: ${today} `;
    setPatientInfo({ ...patientInfo, symptoms: updatedText });
  };

  return (
    <div className="patientInfo-container">
      <form className="patient-info-form">
        <header className="first-card-info">
          <label className="patient-name">
            NAME:
            <input
              className="patient-name-input input"
              type="text"
              name="name"
              value={patientInfo.name}
              onChange={handleInputChange}
            />
          </label>

          <label className="patient-surname">
            SURNAME:
            <input
              className="patient-surname-input input"
              type="text"
              name="surname"
              value={patientInfo.surname}
              onChange={handleInputChange}
            />
          </label>

          <label className="patient-ssn">
            SSN:
            <input
              className="patient-ssn-input input"
              type="text"
              name="SSN"
              value={patientInfo.SSN}
              onChange={handleInputChange}
            />
          </label>
        </header>
      </form>

      <h1 className="h1-patient-med">PATIENT MEDICAL INFORMATION</h1>
      <div className="second-card-info-container">
        <form>
          <main className="second-card-info">
            <label className="patient-symptoms">
              <textarea
                name="symptoms"
                value={patientInfo.symptoms}
                onChange={handleInputChange}
                placeholder="Enter patient symptoms..."
                onClick={() => {
                  AddDateOnClick();
                }}
              />
            </label>

            <label className="patient-allergies">
              <textarea
                name="allergies"
                value={patientInfo.allergies}
                onChange={handleInputChange}
                placeholder="Enter known allergies..."
              />
            </label>

            <label className="patient-disease-history">
              <textarea
                name="diseasehistory"
                value={patientInfo.diseasehistory}
                onChange={handleInputChange}
                placeholder="Enter disease history..."
              />
            </label>

            <label className="patient-medications">
              <textarea
                name="medications"
                value={patientInfo.medications}
                onChange={handleInputChange}
                placeholder="Enter current medications..."
              />
            </label>

            <label className="patient-diagnosis">
              <textarea
                name="diagnosis"
                value={patientInfo.diagnosis}
                onChange={handleInputChange}
                placeholder="Enter diagnosis..."
              />
            </label>

            <label className="patient-other">
              <textarea
                name="other"
                value={patientInfo.other}
                onChange={handleInputChange}
                placeholder="Enter additional information..."
              />
            </label>
          </main>
        </form>
      </div>
      <div className="button-container">
        <button className="update-btn" onClick={handleUpdate}>
          UPDATE
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          DELETE
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default PatientInfo;
