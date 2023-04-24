import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import LocationList, {
  type Location,
} from "../../components/LocationList/LocationList";
import "./HomePage.css";

type ResponseData = {
  locations: Location[];
};
export default function HomePage() {
  const { data, error } = useFetch<ResponseData>(process.env.REACT_APP_DB_URL);

  if (error) {
    return (
      <p aria-live="polite" role="status">
        {error.message}
      </p>
    );
  }

  if (!data) {
    return (
      <p aria-live="polite" role="status">
        Loading...
      </p>
    );
  }

  console.log(data);

  const { locations } = data;

  return <LocationList locations={locations} />;

  //   return (
  //     <div className="location-grid">
  //       {locations.map((location) => (
  //         <article key={location.id} className="location-card">
  //           <div className="image-wrapper">
  //             <img src={location.photo} alt="location" />
  //           </div>
  //           <h3>
  //             {location.name}, {location.country}
  //           </h3>
  //           <p>{location.description}</p>
  //           <Link to={`/locations/${location.id}`} className="btn btn-secondary">
  //             View location
  //           </Link>
  //         </article>
  //       ))}
  //     </div>
  //   );
}
