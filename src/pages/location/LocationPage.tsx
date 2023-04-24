import { Navigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { type Location } from "../../components/LocationList/LocationList";
import { useNavigate } from "react-router-dom";

import "./LocationPage.css";
import Weather from "../../components/weather/Weather";
import EditPage from "../edit/EditPage";
import { useState } from "react";
export type ResponseData = {
  location: Location[];
};
export default function LocationPage() {
  const navigate = useNavigate();
  const { locationId } = useParams();

  const { data, error } = useFetch<ResponseData>(
    `${process.env.REACT_APP_DB_URL}/${locationId}`
  );

  const [showEditPage, setShowEditPage] = useState(false);

  const handleDelete = () => {
    console.log(
      "in handle delete",
      `process.env.REACT_APP_DB_URL}/${locationId}`
    );
    fetch(`${process.env.REACT_APP_DB_URL}/${locationId}`, {
      method: "DELETE",
    })
      .then(() => navigate("/"))
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  const handleEdit = () => {
    setShowEditPage(!showEditPage);
  };

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

  const { location } = data;
  const { id, name, country, photo, description } = location[0];

  if (showEditPage)
    return <EditPage initialFormData={{ name, country, photo, description }} />;

  return (
    <article className="location">
      <div className="image-wrapper">
        <img src={photo} alt="" />
      </div>
      <div className="location-meta">
        <h1>
          {name}, {country}
        </h1>
        <p>{description}</p>
        <input
          type="submit"
          value="Delete"
          className="btn btn-danger"
          onClick={handleDelete}
        />
        <input
          type="submit"
          value="Edit"
          className="btn btn-primary"
          onClick={handleEdit}
        />
      </div>

      <Weather searchTerm={`${name}, ${country}`} />
    </article>
  );
}
