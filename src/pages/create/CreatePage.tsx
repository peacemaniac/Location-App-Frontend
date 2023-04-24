import { FormEvent } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import { type Location } from "../../components/LocationList/LocationList";
import { Navigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import "./CreatePage.css";
const initialFormData = {
  name: "",
  country: "",
  photo: "",
  description: "",
};
export type NewLocation = Omit<Location, "id">;

export default function CreatePage() {
  const { formData, updateFormField } = useForm<NewLocation>(initialFormData);
  const { postData, data, error } = useFetch<NewLocation>(
    process.env.REACT_APP_DB_URL,
    { method: "POST" }
  );
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent the default submit event which reloads the page
    postData(formData);
  };

  if (data) {
    return <Navigate to="/" />;
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      formData={formData}
      updateFormField={updateFormField}
    />
  );
}
