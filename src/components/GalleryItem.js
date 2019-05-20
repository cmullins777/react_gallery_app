import React from 'react';

// GalleryItem component
const GalleryItem = (props) => (
  <li className="photo-container">
    <img src={props.url} alt=""/>
  </li>
);

export default GalleryItem;
