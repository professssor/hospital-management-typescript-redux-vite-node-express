import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addWard } from './wardSlice';
import { WardType } from './WardView';

function WardForm({ handleForm }) {
  const dispatch = useDispatch();
  const [wardData, setWardData] = useState<WardType>({
    wardnumber: 0,
    capacity: 0,
    specialization: "",
  });

  return (
    <form onSubmit={(e) => handleForm(e, wardData)}>
      <label>
        Ward Number:
        <input
          type="number"
          value={wardData.wardnumber}
          onChange={(e) =>
            setWardData({ ...wardData, wardnumber: parseInt(e.target.value) })
          }
        />
      </label>
      <label>
        Capacity:
        <input
          type="number"
          value={wardData.capacity as number}
          onChange={(e) =>
            setWardData({ ...wardData, capacity: parseInt(e.target.value) })
          }
        />
      </label>
      <label>
        Specialization:
        <select
          value={wardData.specialization}
          onChange={(e) =>
            setWardData({ ...wardData, specialization: e.target.value })
          }
        >
          <option value="">Select Ward</option>
          <option value="Ward A">Ward A</option>
          <option value="Ward B">Ward B</option>
          <option value="Ward C">Ward C</option>
        </select>
      </label>
      <button type="submit">Add Ward</button>
    </form>
  );
}

export default WardForm;
