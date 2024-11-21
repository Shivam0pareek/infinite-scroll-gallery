import React from 'react';
import './PhotoCard.css';

const PhotoCard = ({ photo }) => {
  return (
    <div className="photo-card">
      <img 
        src={photo.urls.small} 
        alt={photo.alt_description || "Unsplash photo"} 
        loading="lazy" 
      />
      <p>{photo.user.name}</p>
    </div>
  );
};

export default PhotoCard;
