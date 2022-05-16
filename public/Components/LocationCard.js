export default function LocationCard({ children, id, onDelete }) {
  return (
    <li>
      {children}
      <button onClick={() => onDelete(id)}>x</button>
    </li>
  );
}
