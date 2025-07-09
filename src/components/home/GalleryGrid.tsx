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

const mockData: ImageData[] = [
  {
    thumb: 'https://p-airnz.com/cms/assets/Common-Assets/Ancillary/1200x800-nz-scenicavis-budget-rav4-moke-lake__ScaleMaxWidthWzkxNF0_ExtRewriteWyJqcGciLCJhdmlmIl0.avif',
    full: 'https://p-airnz.com/cms/assets/Common-Assets/Ancillary/1200x800-nz-scenicavis-budget-rav4-moke-lake__ScaleMaxWidthWzkxNF0_ExtRewriteWyJqcGciLCJhdmlmIl0.avif',
    location: 'Queenstown',
    category: 'Mountains',
    videoId: 'bJqS6z7m-ks',
  },
  {
    thumb: 'https://at.govt.nz/media/qptjjmfd/logo-at-operational.svg',
    full: 'https://at.govt.nz/media/dyhp0ee3/auckland-transport-more-ways-to-pay-promotion.jpg?mode=crop&width=1535&heightratio=0.5625&format=webp',
    location: 'Auckland',
    category: 'Transport',
    videoId: 'c9cz1VBGEEY',
  },
  {
    thumb: 'https://www.helicopterme.co.nz/cdn/shop/files/Home_About_Us_Heli_Me_900x.jpg?v=1663825785',
    full: 'https://www.helicopterme.co.nz/cdn/shop/files/Home_About_Us_Heli_Me_900x.jpg?v=1663825785',
    location: 'Auckland',
    category: 'Cities',
    videoId: 'M7lc1UVf-VE',
  },
];

const GalleryGrid = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [hover, setHover] = useState<{ data: ImageData; x: number; y: number } | null>(null);
  const [popupImage, setPopupImage] = useState<string | null>(null);
  const [youtubeId, setYoutubeId] = useState<string | null>(null);
  const [visited, setVisited] = useState<Set<number>>(new Set());

  useEffect(() => {
    const repeated = Array.from({ length: 48 }, (_, i) => mockData[i % mockData.length]);
    setImages(repeated);
  }, []);

  const filtered = images.filter(
    (img) =>
      (!search || img.location.toLowerCase().includes(search)) &&
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
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
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
              setHover({
                data: img,
                x: e.pageX,
                y: e.pageY,
              })
            }
            onMouseLeave={() => setHover(null)}
            onClick={() => {
              setPopupImage(img.full);
              markVisited(index);
            }}
          >
            <img src={img.thumb} alt={img.location} />

            {/* Play Button */}
            {img.videoId && (
              <div
                className={styles.youtubePlay}
                onClick={(e) => {
                  e.stopPropagation();
                  setYoutubeId(img.videoId || '');
                  markVisited(index);
                }}
              />
            )}

            {/* Green Dot */}
            {visited.has(index) && <div className={styles.visitedDot} />}
          </div>
        ))}
      </div>

      {/* Hover Preview */}
      {hover && (
        <div
          className={styles.hoverPreview}
          style={{
            top: hover.y + 10,
            left: hover.x + 10,
          }}
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
