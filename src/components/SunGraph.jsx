// Import necessary React and chart components, and the stylesheet
import React from "react";
import ReactApexChart from "react-apexcharts";
import "./sungraph.css";

/**
 * SunGraph component to display a chart with a normal distribution pattern.
 * @returns {JSX.Element} - Returns a JSX element representing the SunGraph.
 */
const SunGraph = () => {
  // Function to generate points for a normal distribution curve
  const generateNormalDistributionPoints = () => {
    const points = [];
    const mean = 0; // Mean of the distribution
    const standardDeviation = 1; // Standard deviation of the distribution

    // Generate points for the normal distribution curve
    for (let x = -5; x <= 5; x += 0.1) {
      const y =
        (1 / (standardDeviation * Math.sqrt(2 * Math.PI))) *
        Math.exp(-0.5 * Math.pow((x - mean) / standardDeviation, 2));
      points.push({ x, y });
    }

    return points;
  };

  // Generate data points for the normal distribution curve
  const normalDistributionData = generateNormalDistributionPoints();

  // Configuration options for the ApexChart
  var options = {
    series: [
      {
        name: "series1",
        data: normalDistributionData,
      },
    ],
    chart: {
      height: 100,
      type: "area",
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
          colorStops: [
            {
              offset: 0,
              color: "#fffadd", // Yellow color
              opacity: 1,
            },
            {
              offset: 100,
              color: "#ffe4b1", // Orange color
              opacity: 1,
            },
          ],
        },
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      show: false,
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: "#fffadd", // Yellow color
            opacity: 1,
          },
          {
            offset: 100,
            color: "#ffe4b1", // Orange color
            opacity: 1,
          },
        ],
      },
    },
  };

  // Render the ReactApexChart component with the defined options
  return (
    <ReactApexChart
      options={options}
      series={options.series}
      type="area"
      height={200}
    />
  );
};

// Export the SunGraph component as the default export
export default SunGraph;
