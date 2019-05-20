import React from 'react';
import GalleryItem from './GalleryItem';
import NoImages from './NoImages';

const Gallery = (props) => {

  const results = props.data;
  let images;
  if (results.length > 0) {
    images = results.map(image => <Gallery url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} key={image.id}/>
    );
  } else {
    images = <NoImages />
  }

  console.log(results);

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>

      </ul>
    </div>
  );
}

export default Gallery;
