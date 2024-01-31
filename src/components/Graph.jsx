import ReactApexChart from "react-apexcharts";
import "./graph.css";

/**
 * Graph component to display temperature data using ReactApexChart.
 * @param {array} getHourlyForcaseData - Array of temperature data for hourly forecast.
 * @returns {JSX.Element} - Returns a JSX element representing the graph.
 */
const Graph = ({ getHourlyForcaseData }) => {
  // Configuration options for the ApexChart
  var options = {
    series: [
      {
        // Name of the series (e.g., Temperature)
        name: "Temperature",
        // Data points for the series
        data: getHourlyForcaseData,
      },
    ],
    options: {
      // Chart configuration
      chart: {
        type: "area", // Chart type (area in this case)
        height: 350, // Height of the chart
        toolbar: { show: false }, // Hide chart toolbar
        zoom: {
          autoScaleYaxis: true, // Automatically scale the y-axis
          enabled: true, // Enable zoom functionality
        },
      },
      dataLabels: {
        enabled: false, // Disable data labels on the chart
      },
      stroke: {
        curve: "straight", // Curve type for the line (straight in this case)
      },
      xaxis: {
        // X-axis configuration
        formatter: function (value) {
          return value + "°C"; // Format x-axis labels
        },
      },
      yaxis: {
        show: false, // Hide the y-axis
      },
      legend: {
        horizontalAlign: "left", // Horizontal alignment of the legend
      },
      tooltip: {
        // Tooltip configuration
        y: {
          formatter: function (value) {
            return value + "°C"; // Format tooltip values
          },
        },
      },
    },
  };

  // Render the ReactApexChart component
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

// Export the Graph component as the default export
export default Graph;
