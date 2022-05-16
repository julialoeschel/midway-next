import styles from "../../styles/LocationCard.module.css";

export default function LocationCard({ children, id, onDelete }) {
  return (
    <li className={styles.locationCard}>
      <button className={styles.button} onClick={() => onDelete(id)}>
        &#10007;
      </button>
      {children}
    </li>
  );
}
