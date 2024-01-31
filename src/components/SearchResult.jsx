import "./searchresult.css";
import Tile from "./Tile";

/**
 * 
 * @param {array} listOfCities 
 * @returns array of updated cities 
 * 
 * 
 * 
 * It will call api and dispatch actions and will update application weather data on user click
 * @param {function updateApplicationDataByCity(city) {  where city is the value entered by the user
  
 }} 
 */

const SearchResult = ({ listOfCities, updateApplicationDataByCity }) => {
  return (
    <>
      {listOfCities.length ? (
        <div className="result-container">
          {listOfCities.map((item) => {
            return (
              <Tile
                data={item}
                updateApplicationDataByCity={updateApplicationDataByCity}
                key={Math.floor(Math.random() * 1000)}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchResult;
