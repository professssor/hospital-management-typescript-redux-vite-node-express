import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import PatientForm, { Patients } from "./patientForm";
import { addPatient, deletePatient, fetchPatients } from "./patientSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard";



type Props = {};

function Patient({}: Props) {
  const dispatch = useDispatch<any>();
  const [formToggle, setFormToggle] = useState<boolean>(false);
  const { status, patients } = useSelector((state: any) => state.patient);
  const [patientData, setPatientData] = useState<Patients[]>([]);
  useEffect(() => {

    dispatch(fetchPatients());
  }, [dispatch]);
  useEffect(() => {
    setPatientData([...patients]);
  }, [patients]);

  const handleForm = (e: FormEvent, enteredValue: Patients) => {
    e.preventDefault();
    if(enteredValue.name === "" ||
      enteredValue.age === null ||
      enteredValue.gender === "" ||
      enteredValue.medicalHistory === "" ||
      enteredValue.contactDetails === ""||
      enteredValue.ward===""){
        alert("fill in all fields")
      }else{
   dispatch(addPatient(enteredValue));
    setFormToggle(false);
      }
   
  };

  return (
    <div style={{ textAlign: "center", margin: "auto" }}>

              <Dashboard/>
      <button
        style={{
          display: "block",
          margin: "auto",
          padding: "10px 20px",
          background: "blue",
          color: "white",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => setFormToggle(!formToggle)}
      >
        ADD PATIENT
      </button>

      {formToggle === true && <PatientForm handleForm={handleForm} />}

      <div style={{ marginTop: "20px" }}>
        <h2 style={{ marginBottom: "10px" }}>Patient Details</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {status === "loading" && <h3>Loading the patient details</h3>}
{status==="failure" && <h3>error loading patient logs</h3>}
          {status === "success" &&
            patients.length > 0 &&
            patientData.map((patient, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  margin: "10px",
                  width: "300px",
                  backgroundColor: "gray",
                }}
              >
                <h3>{patient.name}</h3>
                <p>Age: {patient.age}</p>
                <p>Gender: {patient.gender}</p>
                <p>Medical History: {patient.medicalHistory}</p>
                <p>Contact Details: {patient.contactDetails}</p>
                <p>Ward: {patient.ward}</p>
            
                <button onClick={()=> dispatch(deletePatient(patient._id))}>Delete</button>
                    <Link to={`/patient/${patient._id}`}>
                     <button style={{margin:"3px"}}>View Patient</button>
                     </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Patient;
