"use client";

import React, { useState } from 'react';
import { FaCogs, FaBatteryHalf, FaThermometerHalf, FaBars, FaPlug } from 'react-icons/fa';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const updateChargingStatus = async (charging: boolean) => {
  const formData = new URLSearchParams();
  formData.append('charging', charging.toString());

  await fetch(`${backendUrl}/api/dashboard/battery/charging`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });
};

const BottomRowButtons: React.FC = () => {
  const [isCharging, setIsCharging] = useState<boolean>(false);

  const handleChargingClick = async () => {
    const newChargingStatus = !isCharging;
    setIsCharging(newChargingStatus);
    await updateChargingStatus(newChargingStatus);
  };

  return (
    <div className="flex justify-between items-center bg-gray-800 p-1 rounded-lg grid grid-cols-3">
      <div className="flex justify-between items-center bg-gray-800 p-1 rounded-lg">
        {/* Gear Ratio Button */}
        <button className="flex flex-col items-center justify-center bg-gray-700 text-gray-400 rounded-lg w-20 h-20 p-2">
          <FaCogs className="text-3xl" />
        </button>

        {/* Battery Status Button */}
        <button className="flex flex-col items-center justify-center bg-gray-700 text-gray-400 rounded-lg w-20 h-20 p-2">
          <FaBatteryHalf className="text-3xl" />
        </button>

        {/* Battery Temperature Button */}
        <button className="flex flex-col items-center justify-center bg-gray-700 text-gray-400 rounded-lg w-20 h-20 p-2">
          <FaThermometerHalf className="text-3xl" />
        </button>
      </div>
    
      <div className="flex justify-center items-center bg-gray-800 p-1 rounded-lg">
        {/* View Menu Button */}
        <button className="flex flex-col items-center justify-center bg-gray-700 text-gray-400 rounded-lg w-20 h-20 p-2">
          <FaBars className="text-3xl" />
        </button>
      </div>

      <div className="flex justify-end items-center bg-gray-800 p-1 rounded-lg">
        {/* Charging Button */}
        <button
          className="flex flex-col items-center justify-center bg-gray-700 text-gray-400 rounded-lg w-20 h-20 p-2"
          onClick={handleChargingClick}
        >
          <FaPlug className="text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default BottomRowButtons;