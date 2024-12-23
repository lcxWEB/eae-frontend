import React from "react";

const MiddleRowComponents: React.FC = () => {
  return (
    <div className="grid grid-cols-5 gap-4 bg-gray-800 p-4 rounded-lg">
      <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg">
        <span className="text-white text-xl">N/N</span>
        <span className="text-gray-400 text-sm">Gear</span>
      </div>
      <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg">
        <span className="text-white text-xl">22%</span>
        <span className="text-gray-400 text-sm">Battery</span>
      </div>
      <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg">
        <span className="text-white text-xl">33°C</span>
        <span className="text-gray-400 text-sm">Temp</span>
      </div>
      <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg">
        <span className="text-white text-xl">0 RPM</span>
        <span className="text-gray-400 text-sm">RPM</span>
      </div>
      <div className="col-span-2 flex flex-col items-center bg-gray-700 p-4 rounded-lg">
        <label className="text-white">Motor Speed Setting</label>
        <input type="range" min="0" max="4" className="w-full" />
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
