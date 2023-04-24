import { Link } from "react-router-dom";
import "./LocationList.css";

export type Location = {
  id: string;
  name: string;
  country: string;
  photo: string;
  description: string;
};

export default function LocationList({ locations }: { locations: Location[] }) {
  return (
    <div className="location-grid">
      {locations.map((location) => (
        <article key={location.id} className="location-card">
          <div className="image-wrapper">
            <img src={location.photo} alt="location" />
          </div>
          <h3>
            {location.name}, {location.country}
          </h3>
          <p>{location.description}</p>
          <Link to={`/locations/${location.id}`} className="btn btn-secondary">
            View location
          </Link>
        </article>
      ))}
    </div>
  );
}
