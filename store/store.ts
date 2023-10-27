
import { configureStore } from '@reduxjs/toolkit';
import patientSlice from '../src/components/Patients/patientSlice';
import wardSlice from '../src/components/Ward/wardSlice';

const store = configureStore({
  reducer: {
    patient: patientSlice,
    ward:wardSlice
  }, 
});



export default store;
