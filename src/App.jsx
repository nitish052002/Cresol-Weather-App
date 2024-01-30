import { useState, useEffect } from "react";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { getCoords } from "./store/features/coordinateSlice";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const position = useSelector((state) => state.coordinate);

  useEffect(() => {
    const getCoordinates = () => {
      navigator.geolocation.getCurrentPosition(
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
        (error) => {
          console.error("Error getting coordinates:", error);
        },
        {
          timeout: 10000,
        }
      );
    };

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
      getCoordinates();
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, [dispatch]);

  return (
    <main className="app">
      {loading || !position ? (
        <Loader />
      ) : (
        <>
          
        </>
      )}
    </main>
  );
}

export default App;