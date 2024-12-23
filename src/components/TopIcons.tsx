/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ParkingIcon from "../assets/icons/parking-indicator.svg";
import EngineIcon from "../assets/icons/parking-indicator.svg";
import MotorIcon from "../assets/icons/parking-indicator.svg";
import BatteryIcon from "../assets/icons/parking-indicator.svg";

const Icon: React.FC<{ isActive: boolean; SvgComponent: React.FC }> = ({
  isActive,
  SvgComponent,
}) => (
  <div className="flex flex-col items-center">
    {/* <img src="./parking-indicator.svg" className="text-red-500"/> */}

    <SvgComponent className={`w-10 h-10 ${isActive ? "text-red-500" : "text-gray-400"}`} />
  </div>
);

const TopIcons: React.FC = () => {
  return (
    <div className="flex justify-around bg-gray-800 p-4 rounded-lg">
      <Icon isActive={false} SvgComponent={ParkingIcon} />
      <Icon isActive={true} SvgComponent={EngineIcon} />
      <Icon isActive={false} SvgComponent={MotorIcon} />
      <Icon isActive={true} SvgComponent={BatteryIcon} />
    </div>
  );
};

export default TopIcons;
