const DetailsPage = (router) => {
    const listingId = router.match.params.id;
  
    const data = {
      "location": {
        "type": "Point",
        "coordinates": [
          -79.6729838,
          43.5482599
        ]
      },
      "roomCount": {
        "bedrooms": 100,
        "bathrooms": 10
      },
      "id": "65bfafc116524254cd07f34b",
      "title": "University of Toronto Mississauga",
      "description": "University for Sale! Great Deal! Don't miss it!!!!",
      "address": "3359 Mississauga Rd, Mississauga, ON L5L 1C6",
      "price": 1000000000,
      "images": [
        "https://csc301-uhome-images.s3.us-east-1.amazonaws.com/50616376962f449a93b0f99a0c2aef1f.jpg",
        "https://csc301-uhome-images.s3.us-east-1.amazonaws.com/b06e9ba890934da4a24d7fc0e813b699.jpg",
        "https://csc301-uhome-images.s3.us-east-1.amazonaws.com/dd9905e277e8410494d11a0b247147bf.jpg"
      ],
      "structuralType": "HOUSE",
      "leaser": "OWNER"
    };
  
    const toPascalCase = (str) => str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  
    const formatPrice = (num) => parseInt(num).toLocaleString();
  
    return (
      <div>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <p>{data.address}</p>
        <p>${formatPrice(data.price)}</p>
        <hr />
        <ul>
          <li>Bedrooms: {data.roomCount.bedrooms}</li>
          <li>Bathrooms: {data.roomCount.bathrooms}</li>
          <li>Type: {toPascalCase(data.structuralType)}</li>
          <li>Leaser: {toPascalCase(data.leaser.toLowerCase())}</li>
        </ul>
        {
          data.images.map((image, index) => {
            return <img key={index} src={image} height={300} />
          })
        }
        <iframe
          src={`http://maps.google.com/maps?q=${data.location.coordinates[1]},${data.location.coordinates[0]}8&z=13&output=embed`}
          width="400" height="300"
          style={{ border: 0 }} allowfullscreen=""
          loading="lazy" referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  };
  
  export default DetailsPage;