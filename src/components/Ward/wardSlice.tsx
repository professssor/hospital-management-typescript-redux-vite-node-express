import { createAsyncThunk, createSlice, AsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WardType } from "./WardView";


// Define the initial state
const initialState = {
    
  wards: [] as WardType[],
  status: "idle",
  error: null,
  errorMessage: "",
};

// Create an async thunk to fetch wards
export const fetchWards = createAsyncThunk("wards/fetchWards", async () => {
  const response = await axios.get(
    "https://hospital-management-system.professssor.repl.co/wards"
  );
  return response.data.data;
});

// Create an async thunk to add a ward
export const addWard:AsyncThunk<any, any, any> = createAsyncThunk("wards/addWard", async (wardData) => {
  const response = await axios.post(
    "https://hospital-management-system.professssor.repl.co/wards",
    wardData
  );
  return response.data;
});

// Create an async thunk to update ward details
export const updateWardDetails:AsyncThunk<any, any, any> = createAsyncThunk(
  "wards/updateWardDetails",
  async ({ id, updateData }) => {
    const response = await axios.put(
      `https://hospital-management-system.professssor.repl.co/wards/${id}`,
      updateData
    );
    return response.data.data;
  }
);

// Create an async thunk to delete a ward
export const deleteWard:AsyncThunk<any, any, any> = createAsyncThunk("wards/deleteWard", async (id) => {
  const response = await axios.delete(
    `https://hospital-management-system.professssor.repl.co/wards/`,
    { data: { _id: id } }
  );
  return response.data.data;
});

// Create the ward slice
export const wardSlice = createSlice({
  name: "ward",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // for fetching wards
    builder.addCase(fetchWards.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(fetchWards.rejected, (state, action) => {
      state.status = "failure";
      state.errorMessage = (action.error as any).message!;
    });

    builder.addCase(fetchWards.fulfilled, (state, action) => {
      state.status = "success";
      state.wards = action.payload;
    });

    // for adding a ward
    builder.addCase(addWard.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(addWard.rejected, (state, action) => {
      state.status = "failure";
      state.errorMessage = (action.error as any).message;
    });

    builder.addCase(addWard.fulfilled, (state, action) => {
      state.status = "success";
      state.wards.push(action.payload);
    });

    // for updating ward details
    builder.addCase(updateWardDetails.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(updateWardDetails.rejected, (state, action) => {
      state.status = "failure";
      state.errorMessage = (action.error as any).message;
    });

    builder.addCase(updateWardDetails.fulfilled, (state, action) => {
      state.status = "success";
      const foundIndex = state.wards.findIndex((ward) => ward._id === action.payload._id);
      if (foundIndex !== -1) {
        state.wards[foundIndex] = action.payload;
      }
    });

    // for deleting a ward
    builder.addCase(deleteWard.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(deleteWard.rejected, (state, action) => {
      state.status = "failure";
      state.errorMessage = (action.error as any).message;
    });

    builder.addCase(deleteWard.fulfilled, (state, action) => {
      state.status = "success";
      state.wards = state.wards.filter((ward) => ward._id !== action.payload._id);
    });
  },
});

export default wardSlice.reducer;
