import React from 'react';
import MaterialIcon from 'material-icons-react';
// Error displayed when no matching images found
const NoImagesFound = (props) => (
  <div>
    <MaterialIcon icon="sentiment_very_dissatisfied" />
    <h3>Sorry, we couldn't find a match for that.</h3>
  </div>
);

export default NoImagesFound;
