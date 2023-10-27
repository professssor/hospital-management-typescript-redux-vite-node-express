import React, { useState } from "react";

import { mainContainer, formContainer, genderContainer } from "./patientcss";

type PatientFormProps = {
  handleForm: (e: React.FormEvent, enteredValue: Patients) => void;
};


export type Patients = {
  _id?: String;
  name: string;
  age: number;
  gender: string;
  medicalHistory: string;
  contactDetails: string;
  ward: string;
};

function PatientForm({ handleForm} :PatientFormProps) {
  const [patient, setPatient] = useState<Patients>({
    name: "",
    age: 0,
    gender: "",
    medicalHistory: "",
    contactDetails: "",
    ward: "",
  });

  return (
    <div style={mainContainer}>
      <form style={formContainer}>
        <label htmlFor="name">Name</label>
        <input
          value={patient.name}
          onChange={(e) => setPatient({ ...patient, name: e.target.value })}
          type="text"
          id="name"
          name="name"
        />

        <label htmlFor="age">Age</label>
        <input
          value={patient.age}
          onChange={(e) =>
            setPatient({ ...patient, age: parseInt(e.target.value) })
          }
          type="number"
          id="age"
          name="age"
        />

        <div style={genderContainer}>
          <label>Gender</label>
          <select
            value={patient.gender}
            onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
            id="gender"
            name="gender"
          >
            <option  value="male">
              Male
            </option>
            <option value="female">Female</option>
          </select>
        </div>

        <label htmlFor="medicalHistory">Medical History</label>
        <input
          value={patient.medicalHistory}
          onChange={(e) =>
            setPatient({ ...patient, medicalHistory: e.target.value })
          }
          type="text"
          id="medicalHistory"
          name="medicalHistory"
        />

        <label htmlFor="contactDetails">Contact Details</label>
        <input
          value={patient.contactDetails}
          onChange={(e) =>
            setPatient({ ...patient, contactDetails: e.target.value })
          }
          type="text"
          id="contactDetails"
          name="contactDetails"
        />

        <label htmlFor="wardAssigned">Ward Assigned</label>
        <select
          value={patient.ward}
          onChange={(e) => setPatient({ ...patient, ward: e.target.value })}
          id="wardAssigned"
          name="wardAssigned"
        >
          <option value="Ward A">Ward A</option>
          <option value="Ward B">Ward B</option>
          <option value="Ward C">Ward C</option>
        </select>
        <button type="submit" onClick={(e) => handleForm(e, patient)}>
          add
        </button>
      </form>
    </div>
  );
}

export default PatientForm;
