import React from "react";
import { Link } from "react-router-dom";

const buttonStyle:React.CSSProperties = {

  padding: "10px 20px",
  background: "blue",
  color: "white",
  borderRadius: "5px",
  textDecoration: "none",
  textAlign:"center",
 margin:"4px",

};

function Dashboard() {
  return (
    <div style={{textAlign:"center", padding:"2rem"}}>
      <h2>Dashboard</h2>
      <div>
        <Link to="/patient" style={buttonStyle}>
          View Patients
        </Link>
        <Link to="/ward" style={buttonStyle}>
          View Wards
        </Link>
        <Link to="/hospital" style={buttonStyle}>
          View Hospital Statistics
        </Link>
            <Link to="/https://github.com/professssor/hospital-management-typescript-redux-vite-node-express" style={{...buttonStyle, background:"green"} }>
     GiTHUB
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
