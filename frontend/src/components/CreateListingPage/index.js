import { useState } from 'react';
import constants from "../../constants.json";
import CoordinatePicker from './CoordinatePicker';
import FormField from './FormField';
import UploadManager from './UploadManager';
import SelectField from './SelectField';
import Layout from "../../layout";

const CreateListingPage = () => {
  const [formData, setFormData] = useState({
    "title": "",
    "description": "",
    "address": "",
    "price": 0,
    "images": [],
    "latitude": constants.UTM_LOCATION[1],
    "longitude": constants.UTM_LOCATION[0],
    "bedrooms": 1,
    "bathrooms": 1,
    "structuralType": "HOUSE",
    "leaser": "OWNER"
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((o) => ({ ...o, [name]: value }));
  };

  const createListing = async () => {
    const response = await fetch(`${constants.API_BASE_URL}/listings/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 201) {
      alert("Listing created!");
    } else if (response.status === 400) {
      const errorMessage = await response.json();
      alert("Failed to create listing. Reason: " + errorMessage);
    } else {
      alert("Failed to create listing");
    }
  };

  return (
    <Layout>
      <div>
      <h2>Create Listing</h2>
      <FormField
        label="Title: "
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <FormField
        label="Description: "
        type="textarea"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <FormField
        label="Address: "
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
      <FormField
        label="Price: "
        type="number"
        min="0"
        step="100"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <FormField
        label="Bedrooms: "
        type="number"
        min="0"
        name="bedrooms"
        value={formData.bedrooms}
        onChange={handleChange}
      />
      <FormField
        label="Bathrooms: "
        type="number"
        min="0"
        name="bathrooms"
        value={formData.bathrooms}
        onChange={handleChange}
      />
      <SelectField
        label="Structural Type: "
        options={[
          { value: "HOUSE", name: "House" },
          { value: "BASEMENT", name: "Basement" },
          { value: "CONDO", name: "Condo" },
          { value: "APARTMENT", name: "Apartment" },
          { value: "ROOM", name: "Room" },
        ]}
        value={formData.structuralType}
        name="structuralType"
        onChange={handleChange}
      />
      <SelectField
        label="Leaser: "
        options={[
          { value: "OWNER", name: "Owner" },
          { value: "ROOMMATE", name: "Roommate" },
        ]}
        value={formData.leaser}
        name="leaser"
        onChange={handleChange}
      />
      <UploadManager onChange={handleChange} />
      <CoordinatePicker onChange={handleChange} />
      <button onClick={createListing}>Create Listing!</button>
    </div>
    </Layout>
    
  );
};

export default CreateListingPage;
