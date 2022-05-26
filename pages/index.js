import Head from "next/head";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import styles from "../styles/Home.module.css";
import React, { useRef, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf";
import Navigation from "../public/Components/Navigation";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  let center;

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [53.54265431104417, 9.984509019267124],
      zoom: 13,
    });

    if (localStorage.getItem("locations") != [] || undefined) {
      const allLocationsRaw = localStorage.getItem("locations");
      const markers = JSON.parse(allLocationsRaw);
      const coordinates = markers.map((marker) => marker.center);

      markers.map((marker) => {
        new mapboxgl.Marker().setLngLat(marker.center).addTo(map.current);

        const features = turf.points(coordinates);
        //center
        center = turf.center(features);

        new mapboxgl.Marker({ color: "black" })
          .setLngLat(center.geometry.coordinates)
          .addTo(map.current);
      });

      //center map over markers
      const line = turf.lineString(coordinates);
      const sw = [turf.bbox(line)[0], turf.bbox(line)[1]];
      const ne = [turf.bbox(line)[2], turf.bbox(line)[3]];

      map.current.fitBounds([sw, ne], {
        padding: { top: 100, bottom: 100, left: 100, right: 100 },
      });

      const long = center.geometry.coordinates[0];
      const lat = center.geometry.coordinates[1];
      console.log("lat/long", lat, long);

      const radius = localStorage.getItem("radius") * 1000;
      const interests = JSON.parse(localStorage.getItem("interests"));

      const categoriesInWords = Object.keys(interests).filter(
        (key) => interests[key]
      );
      if (radius > 0 && categoriesInWords.length > 0) {
        let categoriesNumbers = [];
        if (categoriesInWords.includes("Bar")) {
          categoriesNumbers.push(13003);
        }
        if (categoriesInWords.includes("Restaurant")) {
          categoriesNumbers.push(13065);
        }
        if (categoriesInWords.includes("Cafe")) {
          categoriesNumbers.push(13034);
        }
        if (categoriesInWords.includes("Hotel")) {
          categoriesNumbers.push(19014);
        }
        const categories = categoriesNumbers.join("%2C");
        console.log(categories);

        getPOIs();
      }

      async function getPOIs() {
        const response = await fetch(
          `api/poi/${lat}/${long}/${radius}/${categories}`
        );
        const body = await response.json();
        console.log("wabblwabbl", body);
      }

      const emptyInterests = {
        Bar: false,
        Restaurant: false,
        Cafe: false,
        Hotel: false,
      };
    }
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div>
          <div ref={mapContainer} className={styles.mapcontainer} />
        </div>
      </div>

      <Navigation minimalLocationSet={true} />
    </>
  );
}
