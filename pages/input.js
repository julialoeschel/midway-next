import Link from "next/link";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import styles from "../styles/Input.module.css";
import { useState, useRef, useEffect } from "react";
import LocationCard from "../public/Components/LocationCard";
import Navigation from "../public/Components/Navigation";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

let geocoder;
geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
});

export default function Input() {
  const geocoderElement = useRef();
  const [locations, setLocations] = useState([]);
  const [geocoderIsThere, setGeoCoderIsThere] = useState(false);

  geocoder?.on("result", (event) => {
    setLocations([...locations, event.result]);
  });

  useEffect(() => {
    localStorage.setItem("locations", JSON.stringify(locations));
    localStorage.setItem("radius", 0);
    localStorage.setItem(
      "interests",
      JSON.stringify({
        Bar: false,
        Restaurant: false,
        Cafe: false,
        Hotel: false,
      })
    );
  }, [locations]);

  function handleDelete(id) {
    const allItems = locations.filter((location) => location.id !== id);
    setLocations(allItems);
  }

  return (
    <>
      <h1 className={styles.heading}>put in your locations</h1>
      <div
        ref={geocoderElement}
        id="geocoder"
        className={styles.geocoder}
      ></div>
      <div className={styles.buttonContainer}>
        {geocoderIsThere ? (
          locations.length > 1 ? (
            <p className={styles.message}></p>
          ) : (
            <p className={styles.warn}>put at least 2 locations</p>
          )
        ) : (
          <button
            className={styles.button}
            onClick={() => {
              setGeoCoderIsThere(true);
              geocoder.addTo("#geocoder");
            }}
          >
            get started
          </button>
        )}
      </div>

      <div>
        <ul className={styles.list}>
          {locations?.map((location) => (
            <LocationCard
              key={location.id}
              id={location.id}
              onDelete={handleDelete}
            >
              {location.place_name}
            </LocationCard>
          ))}
        </ul>
      </div>
      <Navigation minimalLocationSet={locations.length > 1} />
    </>
  );
}
