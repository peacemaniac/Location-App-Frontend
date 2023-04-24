import { FormEvent } from "react";
import { type NewLocation } from "../../pages/create/CreatePage";

type PropsType = {
  formData: NewLocation;
  updateFormField: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function Form({
  formData,
  updateFormField,
  handleSubmit,
}: PropsType) {
  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name
        <strong>
          <span aria-label="required">*</span>
        </strong>
      </label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={(e) => updateFormField(e)}
        value={formData.name}
        placeholder="Name"
        required
      />
      <label htmlFor="country">
        Country
        <strong>
          <span aria-label="required">*</span>
        </strong>
      </label>
      <input
        type="text"
        id="country"
        name="country"
        onChange={(e) => updateFormField(e)}
        value={formData.country}
        placeholder="Country"
        required
      />
      <label htmlFor="photo">
        Photo
        <strong>
          <span aria-label="required">*</span>
        </strong>
      </label>
      <input
        type="text"
        id="photo"
        name="photo"
        onChange={(e) => updateFormField(e)}
        value={formData.photo}
        placeholder="Photo"
        required
      />
      <label htmlFor="description">
        Description
        <strong>
          <span aria-label="required">*</span>
        </strong>
      </label>
      <textarea
        id="description"
        name="description"
        onChange={(e) => updateFormField(e)}
        value={formData.description}
        required
      />
      <input type="submit" value="Create" className="btn btn-primary" />
    </form>
  );
}
