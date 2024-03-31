import { useState } from 'react';
import constants from "../../constants.json";
import FormField from './FormField';
import UploadManager from './UploadManager';
import SelectField from './SelectField';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const CreateListingPage = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    price: 0,
    images: [],
    bedrooms: 1,
    bathrooms: 1,
    structuralType: "HOUSE",
    leaser: "OWNER"
  });

  const [validation, setValidation] = useState({
    title: true,
    description: true,
    address: true,
  });

  const [alertData, setAlertData] = useState({}); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    setValidation(prevValidation => ({ ...prevValidation, [name]: true })); 
  };

  const createListing = async () => {
    const newValidation = {
      ...validation,
      title: formData.title.trim() !== '',
      description: formData.description.trim() !== '',
      address: formData.address.trim() !== '',
    };
    setValidation(newValidation);

    
    if (Object.values(newValidation).every(value => value)) {
      const response = await fetch(`${constants.API_BASE_URL}/listings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        setAlertData({ type: 'success', message: 'Listing created! Redirecting to your listing...' });
        const data = await response.json();
        setTimeout(() => {
          history.push(`/list/${data.id}`);
        }, 1000);
      } else if (response.status === 400) {
        const errorMessage = await response.json();
        setAlertData({ type: 'danger', message: `Failed to create listing. Reason: ${errorMessage}` });
      } else {
        setAlertData({ type: 'danger', message: 'Failed to create listing' });
      }
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-5">Create Listing</h2>
      <div className="mb-3">
        <FormField
          label="Title: "
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter the title of your listing"
        />
        {!validation.title && <div className="text-danger">Title is required.</div>}
      </div>
      <div className="mb-3">
        <FormField
          label="Description: "
          type="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your property"
        />
        {!validation.description && <div className="text-danger">Description is required.</div>}
      </div>
      <div className="mb-3">
        <FormField
          label="Address: "
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Property address"
        />
        {!validation.address && <div className="text-danger">Address is required.</div>}
      </div> <div className="mb-3">
        <FormField
          label="Price: "
          type="number"
          min="0"
          step="1"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Set a price"
        />
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <FormField
            label="Bedrooms: "
            type="number"
            min="0"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mb-3">
          <FormField
            label="Bathrooms: "
            type="number"
            min="0"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-3">
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
      </div>
      <div className="mb-3">
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
      </div>
      <UploadManager onChange={handleChange} /> <br />
      {alertData.message && (
        <Alert variant={alertData.type} onClose={() => setAlertData({})} dismissible>
          {alertData.message}
        </Alert>
      )}
      <div className="text-center">
        <button className="btn btn-primary mt-3" onClick={createListing}>Create Listing!</button>
      </div>
    </div>
  );
};

export default CreateListingPage;