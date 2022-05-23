import Navigation from "../public/Components/Navigation";
import { useState } from "react";
import styles from "../styles/Settings.module.css";

export default function Settings() {
  const [radius, setRadius] = useState(0);
  const [interestedIn, setInterestedIn] = useState({
    Bar: false,
    Restaurant: false,
    Cafe: false,
    Hotel: false,
  });
  const [filter, setFilter] = useState([]);

  let locations = [
    { id: 12, text: "test" },
    { id: 13, text: "Test 2" },
  ];
  if (typeof window !== "undefined") {
    const allLocationsRaw = localStorage.getItem("locations");
    locations = JSON.parse(allLocationsRaw);
    localStorage.setItem("radius", radius);
    localStorage.setItem("interests", JSON.stringify(interestedIn));
  }

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
        <ul className={styles.interestList}>
          <li
            className={interestedIn.Bar ? styles.active : styles.interests}
            onClick={() => {
              setInterestedIn(
                interestedIn,
                (interestedIn.Bar = !interestedIn.Bar)
              );
              setFilter(
                Object.keys(interestedIn).filter((key) => interestedIn[key])
              );
            }}
          >
            Bar
          </li>
          <li
            className={
              interestedIn.Restaurant ? styles.active : styles.interests
            }
            onClick={() => {
              setInterestedIn(
                interestedIn,
                (interestedIn.Restaurant = !interestedIn.Restaurant)
              );
              setFilter(
                Object.keys(interestedIn).filter((key) => interestedIn[key])
              );
            }}
          >
            Restaurant
          </li>
          <li
            className={interestedIn.Cafe ? styles.active : styles.interests}
            onClick={() => {
              setInterestedIn(
                interestedIn,
                (interestedIn.Cafe = !interestedIn.Cafe)
              );
              setFilter(
                Object.keys(interestedIn).filter((key) => interestedIn[key])
              );
            }}
          >
            Cafe
          </li>
          <li
            className={interestedIn.Hotel ? styles.active : styles.interests}
            onClick={() => {
              setInterestedIn(
                interestedIn,
                (interestedIn.Hotel = !interestedIn.Hotel)
              );
              setFilter(
                Object.keys(interestedIn).filter((key) => interestedIn[key])
              );
            }}
          >
            Hotel
          </li>
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
          <p>{filter}</p>
        </div>
      </div>

      <Navigation minimalLocationSet={true} />
    </>
  );
}
