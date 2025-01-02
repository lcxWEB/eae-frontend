"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface GaugeProps {
  value: number; // Current value of the gauge
  minValue: number; // Minimum value of the gauge
  maxValue: number; // Maximum value of the gauge
  unit: string; // Unit of the gauge value (e.g., kW, RPM)
}

const Gauge: React.FC<GaugeProps> = ({
  value,
  minValue,
  maxValue,
  unit,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize the ECharts instance
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    // Update the chart options
    chartInstance.current.setOption({
      series: [
        {
          type: "gauge",
          startAngle: 210, // 起始角度
          endAngle: -30,  
          // startAngle: 0, // Full circle starting angle
          // endAngle: 360, // Full circle ending angle
          min: minValue,
          max: maxValue,
          splitNumber: 8,
          pointer: {
            show: true,
            length: "70%",
            width: 4,
            itemStyle: {
              color: "grey", // Pointer color (e.g., red)
            },
          },
          axisLine: {
            lineStyle: {
              width: 5,
              color: [
                [(value - minValue) / (maxValue - minValue), "#00FF00"], // Gauge color
                [1, "#555"], // Background color
              ],
            },
          },
          progress: {
            show: false,
            width: 10,
            itemStyle: {
              // color: "#00FF00",
            },
          },
          axisTick: {
            show: false,
            distance: -15,
            length: 8,
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
          splitLine: {
            show: false,
            distance: -20,
            length: 12,
            lineStyle: {
              color: "#fff",
              width: 2,
            },
          },
          axisLabel: {
            distance: 20,
            color: "#fff",
            fontSize: 10,
            show: true
          },
          detail: {
            valueAnimation: true,
            formatter: `{value} ${unit}`,
            fontSize: 16,
            offsetCenter: [0, "80%"], // Adjust position
            color: "#fff",
          },
          data: [
            {
              value,
            },
          ],
        },
      ],
    });

    // Clean up the chart instance on unmount
    return () => {
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [value, minValue, maxValue, unit]);

  return (
    <div className="flex flex-col items-center bg-gray-700 rounded-lg grid grid-cols-2">
      <div
        ref={chartRef}
        style={{ width: "200px", height: "200px" }} // Full circle gauge
        className="mb-2"
      ></div>
    </div>
  );
};

export default Gauge;
