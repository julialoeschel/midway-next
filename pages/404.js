import Link from "next/link";
import styles from "../styles/404.module.css";

export default function Error() {
  return (
    <>
      <div className={styles.div}>
        <p className={styles.text}>alright.</p>
        <p className={styles.welcome}>Welcome! </p>
        <p className={styles.text}>Enter your locations first</p>
        <button className={styles.button}>
          <Link href="/input">
            <a>click here</a>
          </Link>
        </button>
      </div>
    </>
  );
}
