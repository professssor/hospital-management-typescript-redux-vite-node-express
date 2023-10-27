import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { updateWardDetails } from "./wardSlice"; // Adjust the import to match your ward-related actions
import { WardType } from "./WardView";

type Props = {};

const wardDetailsStyle = {
  backgroundColor: "black",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  margin: "20px auto ",
  maxWidth: "500px",
};

const editButtonStyle = {
  backgroundColor: "gray",
  padding: "1rem",
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

function IndividualWard({}: Props) {
  const dispatch = useDispatch<any>();
  const { wardId } = useParams();

  const { status, wards } = useSelector((state: any) => state.ward);

  const clickedWard = wards.find((ward: WardType) => ward._id === wardId);

  const [isEditing, setIsEditing] = useState(false);

  if (!clickedWard) {
    return <div>Loading...</div>;
  }

//   maade an state object with initial value as the clicked ward 
  const [editedWard, setEditedWard] = useState({ ...clickedWard });

  const handleUpdateWardDetails = () => {

    dispatch(updateWardDetails({ id: wardId, updateData: editedWard }));
    setIsEditing(false);
  };

  return (
    <div style={wardDetailsStyle}>
      {clickedWard && (
        <>
          <h2 style={{ color: "lightgreen" }}>INDIVIDUAL WARD DETAILS</h2>
          <h2>Details for Ward: {clickedWard.wardnumber}</h2>
          <p>Ward Number: {clickedWard.wardnumber}</p>
          <p>Capacity: {clickedWard.capacity}</p>
          <p>Specializations: {clickedWard.specialization}</p>
        </>
      )}

      {isEditing ? (
        <div style={editFormStyle}>
          <h3 style={{ color: "red" }}>Edit Ward Details</h3>
          <form>
            <div>
              <label>Ward Number:</label>
              <input
                type="text"
                value={editedWard.wardnumber}
                onChange={(e) =>
                  setEditedWard({ ...editedWard, wardnumber: e.target.value })
                }
              />
            </div>
            <div>
              <label>Capacity:</label>
              <input
                type="number"
                value={editedWard.capacity}
                onChange={(e) =>
                  setEditedWard({ ...editedWard, capacity: parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <label>Specializations:</label>
              <input
                type="text"
                value={editedWard.specialization}
                onChange={(e) =>
                  setEditedWard({ ...editedWard, specialization: e.target.value})
                }
              />
            </div>
            <button onClick={handleUpdateWardDetails}>Update and Save</button>
            <button style={{ margin: ".4rem", textAlign: "center" }} onClick={() => setIsEditing(false)}>
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

export default IndividualWard;
