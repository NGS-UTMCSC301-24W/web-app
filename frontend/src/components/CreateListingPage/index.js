import { useState } from 'react';
import constants from "../../constants.json";
import CoordinatePicker from './CoordinatePicker';
import FormField from './FormField';
import UploadManager from './UploadManager';

const CreateListingPage = () => {
  const [formData, setFormData] = useState({
    "title": "",
    "description": "",
    "address": "",
    "price": 0,
    "images": [],
    "latitude": constants.UTM_LOCATION[1],
    "longitude": constants.UTM_LOCATION[0],
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "price") {
      value = parseInt(value);
    }

    setFormData((o) => ({ ...o, [name]: value }));
  };

  const createListing = async () => {
    const response = await fetch(`${constants.API_BASE_URL}/listing`, {
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
      <UploadManager onChange={handleChange}/>
      <CoordinatePicker onChange={handleChange} />
      <button onClick={createListing}>Create Listing!</button>
    </div>
  );
};

export default CreateListingPage;
