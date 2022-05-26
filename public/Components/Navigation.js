import styles from "../../styles/Navigation.module.css";
import Link from "next/link";
import { BiWorld } from "react-icons/Bi";
import { GoLocation, GoSettings } from "react-icons/Go";

export default function Navigatio({ minimalLocationSet }) {
  return (
    <footer className={styles.footer}>
      <button className={styles.button}>
        <Link href="/input">
          <a>
            <GoLocation className={styles.navIcon} />
          </a>
        </Link>
      </button>
      {minimalLocationSet ? (
        <>
          <button className={styles.button}>
            <Link href="/">
              <a>
                <BiWorld className={styles.navIcon} />
              </a>
            </Link>
          </button>
          <button className={styles.button}>
            <Link href="/settings">
              <a>
                <GoSettings className={styles.navIcon} />
              </a>
            </Link>
          </button>
        </>
      ) : (
        <>
          <button className={styles.button}>
            <BiWorld className={styles.navIconInactive} />
          </button>
          <button className={styles.button}>
            <GoSettings className={styles.navIconInactive} />
          </button>
        </>
      )}
    </footer>
  );
}
