import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import styles from "../styles/Home.module.css";
import React, { useRef, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf";
import Navigation from "../public/Components/Navigation";
import { useRouter } from "next/router";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home() {
  const router = useRouter();

  const mapContainer = useRef(null);
  const map = useRef(null);

  let center;

  useEffect(() => {
    const test = localStorage.getItem("locations");
    console.log(typeof test);
    if (
      !localStorage.getItem("locations") ||
      localStorage.getItem("locations") == "[]"
    ) {
      router.push("/input");
      return;
    }

    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [53.54265431104417, 9.984509019267124],
      zoom: 13,
    });

    if (
      localStorage.getItem("locations") != "[]" ||
      localStorage.getItem("locations") != undefined
    ) {
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
        getPOIs();
        getPIOs2();
      }

      async function getPOIs() {
        const response = await fetch(
          `api/poi/${lat}/${long}/${radius}/${categories}`
        );
        const body = await response.json();
        return body.results;
      }
      async function getPIOs2() {
        const locationsOfInteres = await getPOIs();

        locationsOfInteres?.map((point) => {
          const coordinates = [
            point.geocodes.main.longitude,
            point.geocodes.main.latitude,
          ];
          const el = document.createElement("div");
          el.innerHTML =
            '<svg clip-rule="evenodd" fill="var(--warn)" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2c5.517 0 9.997 4.48 9.997 9.998 0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.497 8.498 8.497 8.497-3.807 8.497-8.497-3.807-8.498-8.497-8.498z" fill-rule="nonzero"/></svg>';
          el.style.width = "30px";
          el.style.height = "30px";

          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<p>${point.name} </p>`
          );
          new mapboxgl.Marker({
            color: "red",
            scale: 0.7,
            element: el,
          })
            .setLngLat(coordinates)
            .setPopup(popup)
            .addTo(map.current);
        });
      }
      const emptyInterests = {
        Bar: false,
        Restaurant: false,
        Cafe: false,
        Hotel: false,
      };
    } else router.push("/input");
  });

  return (
    <>
      <div className={styles.container}>
        <div>
          <div ref={mapContainer} className={styles.mapcontainer} />
        </div>
      </div>

      <Navigation minimalLocationSet={true} />
    </>
  );
}
