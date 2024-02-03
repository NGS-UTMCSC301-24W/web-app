import { useState } from "react";
import UploadImage from "./UploadImage";

const UploadManager = ({ onChange, ...args }) => {
  const [uploads, setUploads] = useState([]);
  const [count, setCount] = useState(1);

  const onUpload = (imageURL) => {
    const newUploads = [...uploads, imageURL];
    setUploads(newUploads);
    onChange({ target: { name: "images", value: newUploads } });
  }

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <UploadImage
          key={index}
          onUpload={onUpload}
          {...args}
        />
      ))}
      <button onClick={() => setCount(count + 1)}>Add Image</button>
    </>
  );
}

export default UploadManager;