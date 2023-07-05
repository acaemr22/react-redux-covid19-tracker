import React from "react";

const Select = ({ countries, state }) => {
  const [type, setType] = state;
  const sortedCountries = countries
    .reduce(
      (accumulator, currentValue) => [...accumulator, currentValue.name],
      []
    )
    .sort();

  return (
    <select
      className="outline-none border-b-2 py-1 border-gray-800 text-black"
      value={type}
      onChange={(e) => {
        console.log(typeof e.target.value);
        console.log(e.target.value);
        setType(e.target.value);
      }}
      name="countries"
      id="countries"
    >
      <option value="Globe">Globe</option>
      {sortedCountries.map((country, index) => (
        <option key={index} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
};

export default Select;
