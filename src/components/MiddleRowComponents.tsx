"use client";

import React, { useState, useEffect } from "react";
import { FaCogs, FaBatteryHalf, FaThermometerHalf, FaTachometerAlt } from 'react-icons/fa';


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const fetchData = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};

// const updateSpeedSetting = async (speed: number) => {
//   await fetch(`${backendUrl}/api/dashboard/update-speed`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ speed }),
//   });
// };

const updateSpeedSetting = async (speed: number) => {
  const formData = new URLSearchParams();
  formData.append('speed', speed.toString());

  await fetch(`${backendUrl}/api/dashboard/motor/update-speed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });
};

const MiddleRowComponents: React.FC = () => {
  const [battery, setBattery] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [gear, setGear] = useState<string | null>(null);
  const [rpm, setRpm] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number>(1);
  useEffect(() => {
    const getData = async () => {
      const batteryData = await fetchData(`${backendUrl}/api/dashboard/battery`);
      setBattery(batteryData.percentage);
      setTemperature(batteryData.temperature);

      const motorData = await fetchData(`${backendUrl}/api/dashboard/motor`);
      setGear(motorData.gearRatioNumerator + '/' + motorData.gearRatioDenominator);
      setRpm(motorData.rpm);
      setSpeed(motorData.speed);
    };

    // Initial fetch
    getData();

    // Polling every 3 seconds
    const intervalId = setInterval(getData, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleSpeedChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseInt(event.target.value, 10);
    setSpeed(newSpeed);
    setRpm(newSpeed * 200); // Update RPM based on the new speed
    await updateSpeedSetting(newSpeed);
  };

  return (
    <div className="grid grid-cols-6 gap-4 bg-gray-800 p-4 rounded-lg">
      <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg">
        <FaCogs className="text-white text-2xl mb-2" />
        <span className="text-white text-xl">{gear !== null ? gear : 'Loading...'}</span>
      </div>
      <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg">
        <FaBatteryHalf className="text-white text-2xl mb-2" />
        <span className="text-white text-xl">{battery !== null ? `${battery}%` : 'Loading...'}</span>
      </div>
      <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg">
        <FaThermometerHalf className="text-white text-2xl mb-2" />
        <span className="text-white text-xl">{temperature !== null ? `${temperature}°C` : 'Loading...'}</span>
      </div>
      <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg">
        <FaTachometerAlt className="text-white text-2xl mb-2" />
        <span className="text-white text-xl">{rpm !== null ? `${rpm} RPM` : 'Loading...'}</span>
      </div>
      <div className="col-span-2 flex flex-col items-center bg-gray-700 p-4 rounded-lg">
        <label className="text-white">Motor Speed Setting</label>
        <input
          type="range"
          min="0"
          max="4"
          value={speed}
          onChange={handleSpeedChange}
          className="w-full"
        />
        <div className="flex justify-between w-full text-gray-400 text-sm mt-2">
          <span>OFF</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
        </div>
      </div>
    </div>
  );
};

export default MiddleRowComponents;