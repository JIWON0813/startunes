'use client'

import { useState } from 'react';

export default function Video() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchImage = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/fetch-image?url=https://example.com');
      const data = await res.json();

      if (data.src) {
        setImageUrl(data.src);
      } else {
        alert('Image not found');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchImage} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Image'}
      </button>
      
      {imageUrl && <img src={imageUrl} alt="Fetched Image" />}
    </div>
  );
}
