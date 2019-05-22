import React from 'react';
import GalleryItem from './GalleryItem';
import NoImagesFound from './NoImagesFound';

const Gallery = (props) => {

  const results = props.data;
  console.log(results);

  let images;
  console.log(images);
  if (results.length > 0) {
    images = results.map(image => <GalleryItem url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} key={image.id}/>
    );
  } else {
    images = <NoImagesFound />
  }

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>
        { images }
      </ul>
    </div>
  );
}

export default Gallery;
