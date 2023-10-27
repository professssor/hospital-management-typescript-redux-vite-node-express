import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Patients } from "./patientForm";
import { updatePatientDetails } from "./patientSlice";

type Props = {};

const patientDetailsStyle = {
  backgroundColor: "black",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  margin: "20px auto ",
  maxWidth: "500px",
  
};

const editButtonStyle = {
  backgroundColor: "gray",
  padding:"1rem",
  color: "#fff",
  border: "none",
  borderRadius: "5px",

  cursor: "pointer",
  marginTop: "10px",
};

const editFormStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "black",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  margin: "20px",
  maxWidth: "300px",
};

function IndividualPatient({}: Props) {
  const dispatch = useDispatch<any>();
  const { patientId } = useParams();
  const { status, patients } = useSelector((state: any) => state.patient);

  const clickedPatient = patients.find(
    (patient: Patients) => patient._id === patientId
  );

  const [isEditing, setIsEditing] = useState(false);

  if (!clickedPatient) {
    return <div>Loading...</div>;
  }
  const [editedPatient, setEditedPatient] = useState({ ...clickedPatient });
  // function to up dat the patient details
  const handleUpdatePatientDetails = () => {
   
    dispatch(
      updatePatientDetails({ id: patientId, updateData: editedPatient })
    );

         setIsEditing(false);
  };

  return (
    <div style={patientDetailsStyle}>
      {clickedPatient && (
        <>
          {" "}
          <h2 style={{ color: "lightgreen" }}>INDIVIDUAL PATIENT DETAILS</h2>
          <h2>Details for Patient: {clickedPatient.name}</h2>
          <p>Name: {clickedPatient.name}</p>
          <p>Age: {clickedPatient.age}</p>
          <p>Gender: {clickedPatient.gender}</p>
          <p>Medical History: {clickedPatient.medicalHistory}</p>
          <p>Contact Details: {clickedPatient.contactDetails}</p>
          <p>Ward: {clickedPatient.ward}</p>
        </>
      )}

      {isEditing ? (
        <div style={editFormStyle}>
          <h3 style={{color:"red"}}>Edit Patient Details</h3>
          <form>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={editedPatient.name}
                onChange={(e) =>
                  setEditedPatient({ ...editedPatient, name: e.target.value })
                }
              />
            </div>
            <div>
              <label>Age:</label>
              <input
                type="text"
                value={editedPatient.age}
                onChange={(e) =>
                  setEditedPatient({ ...editedPatient, age: e.target.value })
                }
              />
            </div>
            <div>
              <label>Gender:</label>
              <input
                type="text"
                value={editedPatient.gender}
                onChange={(e) =>
                  setEditedPatient({ ...editedPatient, gender: e.target.value })
                }
              />
            </div>
            <div>
              <label>Medical History:</label>
              <input
                type="text"
                value={editedPatient.medicalHistory}
                onChange={(e) =>
                  setEditedPatient({
                    ...editedPatient,
                    medicalHistory: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Contact Details:</label>
              <input
                type="text"
                value={editedPatient.contactDetails}
                onChange={(e) =>
                  setEditedPatient({
                    ...editedPatient,
                    contactDetails: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Ward:</label>
              <input
                type="text"
                value={editedPatient.ward}
                onChange={(e) =>
                  setEditedPatient({ ...editedPatient, ward: e.target.value })
                }
              />
            </div>
            <button onClick={handleUpdatePatientDetails}>
              Update and Save
            </button>
             <button style={{margin:".4rem",textAlign:"center" }} onClick={()=>setIsEditing(false)}>
            cancel
            </button>
          </form>
        </div>
      ) : (
        <button
          style={editButtonStyle}
          onClick={() => {
            setIsEditing(true);
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
}

export default IndividualPatient;
