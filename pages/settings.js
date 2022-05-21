import Navigation from "../public/Components/Navigation";
import { useState } from "react";
import styles from "../styles/Settings.module.css";

export default function Settings() {
  const [radius, setRadius] = useState(0);
  const [interestedIn, setInterestedIn] = useState([]);
  //onLcik on Li item toggle das Interesse

  let locations = [
    { id: 12, text: "test" },
    { id: 13, text: "Test 2" },
  ];
  if (typeof window !== "undefined") {
    const allLocationsRaw = localStorage.getItem("locations");
    locations = JSON.parse(allLocationsRaw);
  }

  console.log(locations);

  return (
    <>
      <div className={styles.settings}>
        <h2>your locations</h2>
        <ul className={styles.listContainer}>
          {locations.map((location) => (
            <li className={styles.locationListing} key={location.id}>
              {location.text}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.settings}>
        <h2>what are you looking for?</h2>
        <ul>
          <li>Bar</li>
          <li>Restaurant</li>
          <li>Cafe</li>
          <li>Hotel</li>
        </ul>
      </div>
      <div className={styles.settings}>
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
        <label htmlFor="radius">km</label>{" "}
        <div>
          <p>{radius} km Radius</p>
          <p>{interestedIn} ist augewählt</p>
        </div>
      </div>

      <Navigation minimalLocationSet={true} />
    </>
  );
}
