'use client';

import { useEffect, useState } from 'react';
import styles from './GalleryGrid.module.css';

interface ImageData {
  thumb: string;
  full: string;
  location: string;
  category: string;
  videoId?: string;
}

const GalleryGrid = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [hover, setHover] = useState<{ data: ImageData; x: number; y: number } | null>(null);
  const [popupImage, setPopupImage] = useState<string | null>(null);
  const [youtubeId, setYoutubeId] = useState<string | null>(null);
  const [visited, setVisited] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/gallery-grid?category=${category}&location=${search}`;
        const res = await fetch(url, { next: { revalidate: 60 } });
        const data = await res.json();
        setImages(data); // assumes backend returns valid array
      } catch (err) {
        console.error('Error loading gallery:', err);
      }
    };

    fetchGallery();
  }, [category, search]);

  const filtered = images.filter(
    (img) =>
      (!search || img.location.toLowerCase().includes(search.toLowerCase())) &&
      (!category || img.category === category)
  );

  const markVisited = (index: number) => {
    setVisited((prev) => new Set(prev).add(index));
  };

  return (
    <div>
      {/* Controls */}
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search location..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Beaches">Beaches</option>
          <option value="Mountains">Mountains</option>
          <option value="Cities">Cities</option>
          <option value="Transport">Transport</option>
        </select>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.map((img, index) => (
          <div
            key={index}
            className={`${styles.block} ${visited.has(index) ? styles.visited : ''}`}
            onMouseMove={(e) =>
              setHover({ data: img, x: e.pageX, y: e.pageY })
            }
            onMouseLeave={() => setHover(null)}
            onClick={() => {
              setPopupImage(img.full);
              markVisited(index);
            }}
          >
            <img src={img.thumb} alt={img.location} />
            {img.videoId && (
              <div
                className={styles.youtubePlay}
                onClick={(e) => {
                  e.stopPropagation();
                  setYoutubeId(img.videoId);
                  markVisited(index);
                }}
              />
            )}
            {visited.has(index) && <div className={styles.visitedDot} />}
          </div>
        ))}
      </div>

      {/* Hover Preview */}
      {hover && (
        <div
          className={styles.hoverPreview}
          style={{ top: hover.y + 10, left: hover.x + 10 }}
        >
          <div className={styles.hoverTitle}>
            {hover.data.location} ({hover.data.category})
          </div>
          <img src={hover.data.full} alt="Preview" />
        </div>
      )}

      {/* Image Popup */}
      {popupImage && (
        <div className={styles.popupOverlay} onClick={() => setPopupImage(null)}>
          <div className={styles.popupContent}>
            <span className={styles.closeBtn}>×</span>
            <img src={popupImage} alt="Full View" />
          </div>
        </div>
      )}

      {/* YouTube Popup */}
      {youtubeId && (
        <div className={styles.popupOverlay} onClick={() => setYoutubeId(null)}>
          <div className={styles.popupContent}>
            <span className={styles.closeBtn}>×</span>
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=1&modestbranding=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ width: '100%', height: '400px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;
