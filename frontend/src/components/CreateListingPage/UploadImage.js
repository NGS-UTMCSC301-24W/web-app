import { useState } from "react";
import constants from "../../constants.json";

const UploadImage = ({ onUpload, ...args }) => {
  const [ uploadState, setUploadState ] = useState("awaiting-upload");
  const [ imageURL, setimageURL ] = useState("");

  const onChange = async (e) => {
    setUploadState("uploading");

    const uploadURL = await fetch(`${constants.API_BASE_URL}/listing-create-upload-url`).then(r => r.json());

    const file = e.target.files[0];
    await fetch(uploadURL, {
      method: "PUT",
      body: file
    });

    setimageURL(uploadURL.split("?")[0]);
    setUploadState("uploaded");

    onUpload(uploadURL.split("?")[0]);
  }

  let element;
  if (uploadState === "awaiting-upload") {
    element = <input type="file" onChange={onChange} {...args} />;
  } else if (uploadState === "uploading") {
    element = <span {...args} >Uploading...</span>;
  } else if (uploadState === "uploaded") {
    element = <img  {...args} src={imageURL} alt="Propery Image" />;
  }

  return (
    <>
      {element}
    </>
  );
}

export default UploadImage;