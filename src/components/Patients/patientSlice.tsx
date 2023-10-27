import {
 AsyncThunk, 
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Patients } from "./patientForm";

const initialState = {
  patients: [] as Patients[],
  status: "idle",
  error: null,
  errorMessage: "",
};

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const response = await axios.get(
      "https://hospital-management-system.professssor.repl.co/patients"
    );
    return response.data.data;
  }
);

export const addPatient: AsyncThunk<any, any, any> = createAsyncThunk(
  "patients/AddPatient",
  async (patientData) => {
    console.log("running here ")
    const response = await axios.post(
      "https://hospital-management-system.professssor.repl.co/patients",
      patientData
    );
    console.log(response)
  

    return response.data;
  }
);

export const updatePatientDetails:AsyncThunk<any, any, any>  = createAsyncThunk(
  "patients/updatePatientDetails",
  async ({id, updateData}) => {

    const response = await axios.put(
      `https://hospital-management-system.professssor.repl.co/patients/${id}`,
      updateData
    );

    return response.data.data;
  }
);

export const deletePatient: AsyncThunk<any, any, any> = createAsyncThunk(
  "patients/deletePatient",
  async (id) => {
    const response = await axios.delete(
      `https://hospital-management-system.professssor.repl.co/patients/`,
      { data: { _id: id } }
    );
 
    return response.data.data;
  }
);

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // for fetching patients
    builder.addCase(fetchPatients.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(fetchPatients.rejected, (state, action) => {
      state.status = "failure";
      state.errorMessage = (action.error as any).message!;
    });

    builder.addCase(fetchPatients.fulfilled, (state, action) => {
      state.status = "success";
      state.patients = action.payload;
    });

    // for adding patient
    builder.addCase(addPatient.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addPatient.rejected, (state, action) => {
      state.status = "failure";
      state.errorMessage = (action.error as any).message;
    });
    builder.addCase(addPatient.fulfilled, (state, action) => {
      state.status = "success";
      state.patients.push(action.payload);
    });

    //for deleting patients

    builder.addCase(deletePatient.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deletePatient.rejected, (state, action) => {
      state.status = "failure";
      state.errorMessage = (action.error as any).message;
    });
    builder.addCase(deletePatient.fulfilled, (state, action) => {
      state.status = "success";
      state.patients = state.patients.filter(
        (patient) => patient._id !== action.payload._id
      );
    });

    //for updating patient details
    builder.addCase(updatePatientDetails.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(updatePatientDetails.rejected, (state, action) => {
      state.status = "failure";
      state.errorMessage = (action.error as any).message;
    });
    builder.addCase(updatePatientDetails.fulfilled, (state, action) => {
      state.status = "success";
      const foundIndex = state.patients.findIndex(
        (patient) => patient._id === action.payload._id
      );
      if (foundIndex !== -1) {
        state.patients[foundIndex] = action.payload;
      }
    });
  },
});

export default patientSlice.reducer;
