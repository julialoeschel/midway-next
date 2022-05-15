import Link from "next/link";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import styles from "../styles/Input.module.css";
import { useState, useRef, useEffect } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

let geocoder;
geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
});

export default function Input() {
  const geocoderElement = useRef();
  const [locations, setLocations] = useState([]);

  geocoder?.on("result", (event) => {
    setLocations([...locations, event.result]);
  });

  useEffect(() => {
    localStorage.setItem("locations", JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    const allLocationsRaw = localStorage.getItem("locations");
    const allLocations = JSON.parse(allLocationsRaw);
    console.log("from localstorage", allLocations);
  }, [locations]);

  return (
    <>
      <div
        ref={geocoderElement}
        id="geocoder"
        className={styles.geocoder}
      ></div>
      {!geocoderElement.current ? (
        <button
          onClick={() => {
            geocoder.addTo("#geocoder");
          }}
        >
          get started
        </button>
      ) : (
        <button>
          <Link href="/">
            <a>lets switch</a>
          </Link>
        </button>
      )}

      <div>
        <ul>
          {locations?.map((location) => (
            <li key={location.id}>{location.place_name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
