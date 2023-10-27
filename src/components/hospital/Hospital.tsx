import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../Patients/patientSlice";
import { fetchWards } from "../Ward/wardSlice";
import { WardType } from "../Ward/WardView";
import { Patients } from "../Patients/patientForm";
import Dashboard from "../Dashboard";

const Hospital = () => {
  const dispatch = useDispatch<any>();

  // Access patient and ward data from Redux store using selectors
  const patients = useSelector((state: any) => state.patient.patients);
  const { status, wards } = useSelector((state: any) => state.ward);

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchWards());
  }, [dispatch]);

  // Function to calculate occupancy rate
  const calculateOccupancyRate = () => {
    if (wards.length === 0) {
      return 0;
    }
    const occupiedBeds = wards.reduce(
      (total: number, ward: WardType) => total + ward.capacity,
      0
    );

    const occupencyRate = (patients.length / occupiedBeds) * 100;

    return occupencyRate;
  };

  // Finding ward with highest occupancy
  function findWardWithHighestOccupancy() {
    let highestOccupancyWard: string | undefined = undefined;

    let highestOccupancy = 0;

    // Calculate the number of patients in each ward
    const wardOccupancy = {};
    wards.forEach((ward: WardType) => {
      const patientsInWard = patients.filter(
        (patient: Patients) => patient.ward === ward.specialization
      );

      wardOccupancy[ward.specialization] = patientsInWard.length;
    });

    Object.keys(wardOccupancy).forEach((wardName) => {
      if (wardOccupancy[wardName] > highestOccupancy) {
        highestOccupancy = wardOccupancy[wardName];
        highestOccupancyWard = wardName;
      }
    });

    return highestOccupancyWard;
  }

  const highestfunctionalWard = () => {
    let highestward = 0;
    let wardSpecialization = "";

    for (let i = 0; i < wards.length; i++) {
      if (wards[i].capacity >= highestward) {
        highestward = wards[i].capacity;
        wardSpecialization = wards[i].specialization;
      }
    }

    return wardSpecialization;
  };

  // Calculate hospital-wide statistics
  const totalPatients = patients.length;
  const occupancyRate = calculateOccupancyRate();

  return (
    <div style={{textAlign
    :"center"}}>

                <Dashboard/>
      <h2>Hospital-Wide Statistics</h2>
      <p>
        Total Number of Patients:{" "}
        <span style={{ color: "green" }}>{totalPatients}</span>{" "}
      </p>
      <p>
        Current Occupancy Rate:{" "}
        <span style={{ color: "green" }}>{occupancyRate.toFixed(2)}%</span>
      </p>
      <p>
        Average Length of Stay in ward A:{" "}
        <span style={{ color: "green" }}>2 days</span>
      </p>
      <p>
        Average Length of Stay in ward B:{" "}
        <span style={{ color: "green" }}>5 days</span>
      </p>
      <p>
        Average Length of Stay in ward C:{" "}
        <span style={{ color: "green" }}>10 days</span>
      </p>
      <p>
        Top-Performing Ward (capacity):{" "}
        <span style={{ color: "green" }}>{highestfunctionalWard()}</span>
      </p>
      <p>
        Top performing ward (occupancy):{" "}
        <span style={{ color: "green" }}>{findWardWithHighestOccupancy()}</span>
      </p>
    </div>
  );
};

export default Hospital;
