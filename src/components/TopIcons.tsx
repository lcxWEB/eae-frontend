/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import ParkingIcon from "../assets/icons/parking-indicator.svg";
import EngineIcon from "../assets/icons/engine.svg";
import MotorIcon from "../assets/icons/motor.svg";
import BatteryIcon from "../assets/icons/battery-low.svg";

type SvgProps = {
  className?: string; // Allow optional className prop
};

type Indicator = {
  id: number;
  name: string;
  activeState: boolean;
};

const Icon: React.FC<{ activeState: boolean; SvgComponent: React.FC<SvgProps> }> = ({
  activeState,
  SvgComponent,
}) => (
  <div className="flex flex-col items-center m-2">
    <SvgComponent className={`w-10 h-10 ${activeState ? "text-red-500" : "text-gray-400"}`} />
  </div>
);

const TopIcons: React.FC = () => {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/dashboard/indicators`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setIndicators(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load indicators");
        setLoading(false);
      }
    };

    // Initial fetch
    fetchIndicators();

    // Polling every 3 seconds
    const intervalId = setInterval(fetchIndicators, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [backendUrl]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex justify-around bg-gray-800 p-4 rounded-lg">
      {indicators.map((indicator) => {
        let SvgComponent;
        switch (indicator.name) {
          case "parking_brake":
            SvgComponent = ParkingIcon;
            break;
          case "engine":
            SvgComponent = EngineIcon;
            break;
          case "motor":
            SvgComponent = MotorIcon;
            break;
          case "battery_low":
            SvgComponent = BatteryIcon;
            break;
          default:
            return null;
        }

        return (
          <Icon key={indicator.id} activeState={indicator.activeState} SvgComponent={SvgComponent} />
        );
      })}
    </div>
  );
};

export default TopIcons;
