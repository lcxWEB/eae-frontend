"use client";

import TopIcons from "./TopIcons";
import Gauge from "./Gauge";
import MiddleRowComponents from "./MiddleRowComponents";
import BottomRowButtons from "./BottomRowButtons";

import React, { useState, useEffect } from 'react';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const fetchMotorData = async () => {
  const response = await fetch(`${backendUrl}/api/dashboard/motor`);
  return await response.json();
};

const Dashboard: React.FC = () => {
  const [power, setPower] = useState<number | null>(null);
  const [rpm, setRpm] = useState<number | null>(null);

  useEffect(() => {
    const getMotorData = async () => {
      const motorData = await fetchMotorData();
      setPower(motorData.powerConsumption);
      setRpm(motorData.rpm);
    };

    // Initial fetch
    getMotorData();

    // Polling every 3 seconds
    const intervalId = setInterval(getMotorData, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center bg-black text-white h-screen p-4">
      <TopIcons />
      <div className="flex justify-around mt-8">
        {/* Power Gauge */}
        <Gauge value={power !== null ? power : 0} minValue={-1000} maxValue={1000} unit="kW" />
        {/* RPM Gauge */}
        <Gauge value={rpm !== null ? rpm : 0} minValue={0} maxValue={800} unit="RPM" />
      </div>
      <MiddleRowComponents />
      <BottomRowButtons />
      {/* <div className="mt-4">
        backendUrl: {backendUrl}
      </div> */}
    </div>
  );
};

export default Dashboard;