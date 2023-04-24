import { FormEvent } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import { type Location } from "../../components/LocationList/LocationList";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Form from "../../components/Form/Form";
import { ResponseData } from "../location/LocationPage";
import "./EditPage.css";
// type initialFormData = {
//   name: string;
//   country: string;
//   photo: string;
//   description: string;
// };
export type NewLocation = Omit<Location, "id">;

export default function EditPage({
  initialFormData,
}: {
  initialFormData: NewLocation;
}) {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const { formData, updateFormField } = useForm<NewLocation>(initialFormData);
  const { data, error } = useFetch<ResponseData>(
    `${process.env.REACT_APP_DB_URL}/${locationId}`
  );
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("in handle submit", formData);
    fetch(`${process.env.REACT_APP_DB_URL}/${locationId}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => navigate("/"))
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
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

  return (
    <>
      <h1> Edit Details of {formData.name}</h1>
      <Form
        handleSubmit={handleSubmit}
        formData={formData}
        updateFormField={updateFormField}
      />
    </>
  );
}
