import React from "react";

const BottomRowButtons: React.FC = () => {
  return (
    <div className="flex justify-around bg-gray-800 p-4 rounded-lg">
      <button className="bg-gray-700 text-white rounded-lg p-3">⚙️</button>
      <button className="bg-gray-700 text-white rounded-lg p-3">⚡</button>
      <button className="bg-gray-700 text-white rounded-lg p-3">🔋</button>
      <button className="bg-gray-700 text-white rounded-lg p-3">🔳</button>
      <button className="bg-gray-700 text-white rounded-lg p-3">🔌</button>
    </div>
  );
};

export default BottomRowButtons;
