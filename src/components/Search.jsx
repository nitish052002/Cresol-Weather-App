import "./search.css";

/**
 * 
 * @param {function filterDataByCities(event) {
  *
 }} param0 
 * @returns 
 */

const Search = ({ filterDataByCities }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        name="city"
        className="city-input"
        placeholder="Enter City"
        onChange={filterDataByCities}
      />
      <i className="fa-solid fa-lg fa-location-dot location-icon"></i>
      <i className="fa-sharp fa-lg fa-solid fa-magnifying-glass search-icon"></i>
    </div>
  );
};

export default Search;
