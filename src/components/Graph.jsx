import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import "./graph.css";




/**
 * 
 * @param {array} getHourlyForcaseData
 * @returns jsx
 */


const Graph = ({getHourlyForcaseData}) => {
  
  var options = {
    series: [
      {
        name : "Temperature",
        data: getHourlyForcaseData,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        toolbar: { show: false },
        zoom: {
          autoScaleYaxis: true,
          enabled : true
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },

      xaxis: {
        formatter: function (value) {
          return value + "°C";
        },
      },
      yaxis: {
        show: false,
      },
      legend: {
        horizontalAlign: "left",
      },
      tooltip: {
        y: {
          formatter: function (value) {
            return value + "°C";
          },
        },
      },
    },
  };

  return (
    <>
      {getHourlyForcaseData.length > 0 ? (
        <ReactApexChart
          options={options.options}
          series={options.series}
          type="area"
          height={350}
          style={{ width: "100%" }}
        />
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default Graph;
