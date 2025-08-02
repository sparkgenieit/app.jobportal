"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./GalleryGrid.module.css";

interface ImageData {
  thumb: string;
  full: string;
  location: string;
  category: string;
  videoId?: string;
  isAd?: boolean;
}

const GalleryGrid = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [hover, setHover] = useState<{
    x: number;
    y: number;
    data: ImageData;
  } | null>(null);
  const [popupImage, setPopupImage] = useState<string | null>(null);
  const [youtubeId, setYoutubeId] = useState<string | null>(null);
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const hoverBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL;

        const [gridRes, adRes] = await Promise.all([
          fetch(`${base}/gallery-grid?category=${category}&location=${search}`, {
            next: { revalidate: 60 },
          }),
          fetch(`${base}/gallery-ad?category=${category}&location=${search}`, {
            next: { revalidate: 60 },
          }),
        ]);

        const gridImages = await gridRes.json();
        const ads = await adRes.json();
const filteredAds = ads.filter((ad) => !category || ad.category === category);
const interleaved = injectAdsIntoGrid(gridImages, filteredAds);
     
        setImages(interleaved);
      } catch (err) {
        console.error("Error loading gallery:", err);
      }
    };

    fetchGallery();
  }, [category, search]);

  const injectAdsIntoGrid = (images: ImageData[], ads: any[]): ImageData[] => {
  if (images.length === 0) return [];

  const totalAdsToInsert = Math.min(Math.ceil(images.length / 3), ads.length);
  const interval = Math.floor(images.length / totalAdsToInsert);
  const result: ImageData[] = [...images];
  let adsInserted = 0;

  for (let i = interval; adsInserted < totalAdsToInsert && i <= result.length; i += interval + 1) {
    const ad = ads[adsInserted++];
    result.splice(i, 0, {
      thumb: `${process.env.NEXT_PUBLIC_API_URL}/uploads/gallery-ads/${ad.blockImage}`,
      full: `${process.env.NEXT_PUBLIC_API_URL}/uploads/gallery-ads/${ad.hoverImage}`,
      location: ad.location,
      category: ad.category,
      videoId: ad.youtubeLink?.split("v=")[1] || undefined,
      isAd: true,
    });
  }

  return result;
};


  const filtered = images.filter(
    (img) =>
      (!search || img.location.toLowerCase().includes(search.toLowerCase())) &&
      (!category || img.category === category)
  );

  const markVisited = (index: number) => {
    setVisited((prev) => new Set(prev).add(index));
  };

  const handleMouseMove = (e: React.MouseEvent, img: ImageData) => {
    if (popupImage || youtubeId) return;

    const hoverWidth = 600;
    const hoverHeight = 400;
    const padding = 10;
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;

    let left = e.pageX + padding;
    let top = e.pageY - hoverHeight / 2;

    if (left + hoverWidth + padding > pageWidth) {
      left = e.pageX - hoverWidth - padding;
    }
    if (top < padding) top = padding;
    if (top + hoverHeight > pageHeight)
      top = pageHeight - hoverHeight - padding;

    setHover({ x: left, y: top, data: img });
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
            className={`${styles.block} ${img.isAd ? styles.adBlock : ""} ${
              visited.has(index) ? styles.visited : ""
            }`}
            onMouseMove={(e) => handleMouseMove(e, img)}
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
            {img.isAd && <div className={styles.adTag}>Ad</div>}
            {visited.has(index) && (
              <div className={styles.visitedDotWrapper}>
                <div className={styles.visitedDot} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating Hover Preview */}
      {hover && !popupImage && !youtubeId && (
        <div
          ref={hoverBoxRef}
          className={`${styles.hoverPopup} ${styles.active}`}
          style={{ top: hover.y, left: hover.x }}
        >
          <div className={styles.hoverTitle}>
            {hover.data.location} ({hover.data.category})
          </div>
          <img src={hover.data.full} alt="Preview" />
        </div>
      )}

      {/* Image Popup */}
      {popupImage && (
        <div
          className={styles.popupOverlay}
          onClick={() => setPopupImage(null)}
        >
          <div
            className={styles.popupContentLarge}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={styles.closeBtn}
              onClick={() => setPopupImage(null)}
            >
              ×
            </span>
            <img src={popupImage} alt="Full View" />
            <button
              className={styles.popupBtn}
              onClick={() => alert("You clicked inside the modal")}
            >
              Click Here
            </button>
          </div>
        </div>
      )}

      {/* YouTube Popup */}
      {youtubeId && (
        <div className={styles.youtubePopup} onClick={() => setYoutubeId(null)}>
          <div
            className={styles.youtubePopupContent}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={styles.closeBtn}
              onClick={() => setYoutubeId(null)}
            >
              ×
            </span>
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;
