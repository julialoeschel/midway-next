import Head from "next/head";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import styles from "../styles/Home.module.css";
import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";
import * as turf from "@turf/turf";
//import Marker from "../public/Components/Marker";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(10);
  const [lat, setLat] = useState(53.4);
  const [zoom, setZoom] = useState(7.3);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    const allLocationsRaw = localStorage.getItem("locations");
    const markers = JSON.parse(allLocationsRaw);
    const coordinates = markers.map((marker) => marker.center);

    markers.map((marker) => {
      new mapboxgl.Marker().setLngLat(marker.center).addTo(map.current);

      const features = turf.points(coordinates);
      const center = turf.center(features);

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
      <button>
        <Link href="/input">
          <a>lets switch</a>
        </Link>
      </button>
    </>
  );
}
