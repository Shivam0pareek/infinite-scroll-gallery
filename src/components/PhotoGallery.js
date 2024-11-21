import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoCard from './PhotoCard';
import './PhotoGallery.css';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchPhotos = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get('https://api.unsplash.com/photos', {
        params: { page, per_page: 12 },
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
        },
      });
      setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="photo-gallery">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Failed to load photos. Try again!</div>}
    </div>
  );
};

export default PhotoGallery;
