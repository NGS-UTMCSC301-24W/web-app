import { useState } from "react";
import UploadImage from "./UploadImage";
import { Container, Row, Col, Button } from 'react-bootstrap';

const UploadManager = ({ onChange, ...args }) => {
  const [uploads, setUploads] = useState([]);
  const [count, setCount] = useState(1);

  const onUpload = (imageURL) => {
    const newUploads = [...uploads, imageURL];
    setUploads(newUploads);
    onChange({ target: { name: "images", value: newUploads } });
  }

  return (
    <Container>
      <Row xs={1} md={2} lg={3} className="g-4">
        {[...Array(count)].map((_, index) => (
          <Col key={index}>
            <UploadImage
              onUpload={onUpload}
              {...args}
            />
          </Col>
        ))}
      </Row>
      <Button variant="primary" className="mt-3" onClick={() => setCount(count + 1)}>Add Image</Button>
    </Container>
  );
}

export default UploadManager;
