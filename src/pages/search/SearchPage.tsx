import LocationList, {
  type Location,
} from "../../components/LocationList/LocationList";
import { useFetch } from "../../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import "./SearchPage.css";

type ResponseData = {
  locations: Location[];
};
export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  console.log("query", query);
  const { data, error } = useFetch<ResponseData>(
    `${process.env.REACT_APP_DB_URL}/search?q=${query}`
  );

  if (error)
    return (
      <p aria-live="polite" role="status">
        {error.message}
      </p>
    );
  if (!data)
    return (
      <p aria-live="polite" role="status">
        Loading...
      </p>
    );

  const { locations } = data;

  return (
    <>
      <h2>Locations including "{query}"</h2>
      <LocationList locations={locations} />
    </>
  );
}
