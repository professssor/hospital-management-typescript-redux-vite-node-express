import React from "react";
import "./App.css";
import Patient from "./components/Patients/Patient";
import { Routes, Route } from "react-router-dom";
import IndividualPatient from "./components/Patients/IndividualPatient";

import WardView from "./components/Ward/WardView";
import IndividualWard from "./components/Ward/IndividualWard";
import Hospital from "./components/hospital/Hospital";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div style={{ width: "100vw" }}>
      <Routes>
         <Route path="/" element={<Dashboard />} />
        <Route path="patient/:patientId" element={<IndividualPatient />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/ward" element={<WardView />} />
        <Route path="/wards/:wardId" element={<IndividualWard />} />
            <Route path="/hospital" element={<Hospital />} />
      </Routes>
    </div>
  );
}

export default App;
