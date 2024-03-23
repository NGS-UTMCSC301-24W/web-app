import { useState } from "react";
import { Button, ProgressBar, Alert, Image } from 'react-bootstrap'; 
import constants from "../../constants.json";

const UploadImage = ({ onUpload, ...args }) => {
  const [uploadState, setUploadState] = useState("awaiting-upload");
  const [imageURL, setimageURL] = useState("");
  const [progress, setProgress] = useState(0); 

  const onChange = async (e) => {
    setUploadState("uploading");
    setProgress(45); 

    const uploadURL = await fetch(`${constants.API_BASE_URL}/listings/upload-image-url`).then(r => r.json());

    const file = e.target.files[0];
    await fetch(uploadURL, {
      method: "PUT",
      body: file
    });

    setimageURL(uploadURL.split("?")[0]);
    setUploadState("uploaded");
    setProgress(100); 

    onUpload(uploadURL.split("?")[0]);
  }

  let element;
  if (uploadState === "awaiting-upload") {
    element = (
      <>
        <input type="file" onChange={onChange} className="form-control" {...args} />
        <ProgressBar now={progress} className="mt-2" hidden />
      </>
    );
  } else if (uploadState === "uploading") {
    element = (
      <>
        <ProgressBar animated now={progress} label={`${progress}%`} />
        <Alert variant="info" className="mt-2">Uploading...</Alert>
      </>
    );
  } else if (uploadState === "uploaded") {
    element = (
      <>
        <Image src={imageURL} style={{ width: '10wh', height: '10vh' }} thumbnail fluid {...args} />
        <Alert variant="success" className="mt-2" >Upload successful!</Alert>
      </>
    );
  }

  return (
    <div className="upload-image-component">
      {element}
    </div>
  );
}

export default UploadImage;
