import React from "react";
import TopIcons from "./TopIcons";
import Gauge from "./Gauge";
import MiddleRowComponents from "./MiddleRowComponents";
import BottomRowButtons from "./BottomRowButtons";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-black text-white h-screen p-4">
      <TopIcons />
      <div className="flex justify-around w-full mt-8">
        {/* Power Gauge */}
        <Gauge value={500} minValue={-1000} maxValue={1000} unit="kW" />

        {/* RPM Gauge */}
        <Gauge value={300} minValue={0} maxValue={800} unit="RPM" />
      </div>
      <MiddleRowComponents />
      <BottomRowButtons />
    </div>
  );
};

export default Dashboard;
