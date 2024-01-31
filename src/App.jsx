import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Loader from "./components/Loader";
import WeatherCard from "./components/WeatherCard";
import WeatherTab from "./components/WeatherTab";
import { useDispatch, useSelector } from "react-redux";
import { getCoords } from "./store/features/coordinateSlice";

/**
 * Main application component responsible for rendering the Weather App.
 * @returns {JSX.Element} - Returns the main application JSX element.
 */
function App() {
  // Redux dispatch function
  const dispatch = useDispatch();

  // State to track loading status
  const [loading, setLoading] = useState(true);

  // Select user's coordinates from Redux store
  const position = useSelector((state) => state.coordinate);

  // Effect to get user's coordinates using geolocation API and update Redux store
  useEffect(() => {
    const getCoordinates = () => {
      navigator.geolocation.getCurrentPosition(
        // Success callback
        (pos) => {
          console.log({
            long: pos.coords.longitude,
            lat: pos.coords.latitude,
          });
          dispatch(
            getCoords({
              long: pos.coords.longitude,
              lat: pos.coords.latitude,
            })
          );
        },
        // Error callback
        (error) => {
          console.error("Error getting coordinates:", error);
        },
        // Geolocation options
        {
          timeout: 10000,
        }
      );
    };

    // Set a timeout to simulate loading and then get coordinates
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
      getCoordinates();
    }, 2000);

    // Cleanup function to clear the loading timeout
    return () => clearTimeout(loadingTimeout);
  }, [dispatch]);

  // Render the main application component
  return (
    <main className="app">
      {/* Conditional rendering based on loading state and user's coordinates */}
      {loading || !position ? (
        <Loader />
      ) : (
        <>
          <Header />
          <WeatherTab />
          <WeatherCard />
        </>
      )}
    </main>
  );
}

// Export the App component as the default export
export default App;
