import Navigation from "../public/Components/Navigation";
import { useState } from "react";

export default function Settings() {
  const [radius, setRadius] = useState(0);
  const [interestedIn, setInterestedIn] = useState([]);
  //onLcik on Li item toggle das Interesse

  const locations = JSON.parse(localStorage.getItem("locations"));
  console.log(interestedIn);

  return (
    <>
      <div>
        <h2>your locations</h2>
        <ul>
          {locations.map((location) => (
            <li key={location.id}>{location.text}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>what are you looking for?</h2>
        <ul>
          <li>Bar</li>
          <li>Restaurant</li>
          <li>Cafe</li>
          <li>Hotel</li>
        </ul>
      </div>
      <div>
        <h2>in a Radius of {radius} km</h2>

        <input
          type="range"
          id="radius"
          min="0"
          max="50"
          onChange={(event) => setRadius(event.target.value)}
        />
        <br></br>
        <span>{radius} </span>
        <label htmlFor="radius">km</label>
      </div>

      <div>
        <p>{radius} km Radius</p>
        <p>{interestedIn} ist augewählt</p>
      </div>
      <Navigation minimalLocationSet={true} />
    </>
  );
}
