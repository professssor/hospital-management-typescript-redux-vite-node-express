import React, { FormEvent, useEffect, useState } from "react";
import WardForm from "./WardForm";
// import { addWard, deleteWard, fetchWards } from "./wardSlice"; // Define ward-related actions
import { useDispatch, useSelector } from "react-redux";
import { addWard, deleteWard, fetchWards } from "./wardSlice";
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard";
type Props = {};

export type WardType = {
  _id?: string;
  wardnumber: number;
  capacity: number;
  specialization: string;
};

function WardView({}: Props) {
  const dispatch = useDispatch<any>();
  const [formToggle, setFormToggle] = useState<boolean>(false);
  const { status, wards } = useSelector((state: any) => state.ward);
  const [wardArray, setWardArray] = useState<WardType[]>([]);

  useEffect(() => {
    dispatch(fetchWards());
  }, [dispatch]);

  useEffect(() => {
    setWardArray([...wards]);
  }, [wards]);

  const handleForm = (e: FormEvent, wardData: WardType) => {
    e.preventDefault();

    dispatch(addWard(wardData));
    setFormToggle(false);
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
        ADD WARD
      </button>

      {formToggle === true && <WardForm handleForm={handleForm} />}

      <div style={{ marginTop: "20px" }}>
        <h2 style={{ marginBottom: "10px" }}>Ward Details</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {status === "loading" && <h3>Loading the ward details</h3>}
          {status === "failure" && <h3>Error loading ward details</h3>}
          {status === "success" && wardArray.length === 0 && (
            <h2>no wards exist , Add them </h2>
          )}
          {status === "success" &&
            wards.length > 0 &&
            wardArray.map((ward, index) => (
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
                <h3>Ward Number: {ward.wardnumber}</h3>
                <p>Capacity: {ward.capacity}</p>
                <p>Specializations: {ward.specialization}</p>
                <button onClick={() => dispatch(deleteWard(ward._id))}>
                  Delete
                </button>
                <Link to={`/wards/${ward._id}`}>
                  <button style={{ margin: "2px" }}>Ward details</button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default WardView;
