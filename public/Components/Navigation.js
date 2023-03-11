import styles from "../../styles/Navigation.module.css";
import Link from "next/link";
//import { BiWorld } from "react-icons/Bi";
import { GoLocation, GoSettings } from "react-icons/Go";

//  <BiWorld className={styles.navIcon} />
//  <GoSettings className={styles.navIcon} />

export default function Navigatio({ minimalLocationSet }) {
  return (
    <footer className={styles.footer}>
      <button className={styles.button}>
        <Link href="/input">
          <a>Input</a>
        </Link>
      </button>
      {minimalLocationSet ? (
        <>
          <button className={styles.button}>
            <Link href="/">
              <a>
                <GoLocation className={styles.navIcon} />
              </a>
            </Link>
          </button>
          <button className={styles.button}>
            <Link href="/settings">
              <a>Settings</a>
            </Link>
          </button>
        </>
      ) : (
        <>
          <button className={styles.button}>Map</button>
          <button className={styles.button}>Settings</button>
        </>
      )}
    </footer>
  );
}
