import React from 'react';

//GalleryItem component renders individual images with unique keys
const GalleryItem = (props) => (
  <li className="photo-container">
    <img src={props.url} alt =""/>
  </li>
);

export default GalleryItem;
