import './ads.css';
import { useEffect, useState } from 'react';
import http from '../../../helpers/http';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function Ads({ type = "long" }) {
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const showGoogleAd = true;

  useEffect(() => {
    setLoading(true);
    setError(false);

    http.get(`/ads/show-ad?type=${type}`)
      .then((response) => {
        setAd(response.data);
        setLoading(false);
      })
      .catch(() => {
        setAd(null);
        setLoading(false);
        setError(true);
      });
  }, [type]);

  useEffect(() => {
    if (!window.adsbygoogle) {
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (window.adsbygoogle && showGoogleAd) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, [showGoogleAd ]);

  if (loading) return <div className="text-gray-500 text-sm">Loading ad...</div>;
  if (error || !ad) return null;

  return (
    <HelmetProvider>
      <div>
        {showGoogleAd ? (
          <div className="google-ad-container">
            <Helmet>
              <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" crossOrigin="anonymous"></script>
            </Helmet>

            <ins 
                className="adsbygoogle"
                style={{ display: "block", minHeight: "90px" }}
                data-ad-client={ad?.adClient || "ca-pub-3940256099942544"}
                data-ad-slot={ad?.adSlot || "5173002025"}
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
          </div>
        ) : (
          <a 
            href={ad?.redirect_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`bg-slate-100 rounded-3 p-2 flex ${type === "short" ? "flex-row" : "flex-col"} gap-3 ad-container no-underline`}
          >
            <img 
              className={`rounded-md ${type === "short" ? "short-ad" : "long-ad"}`} 
              src={ad?.ad_image_url || "/default-ad.png"} 
              alt="Advertisement" 
              loading="lazy"
              onError={(e) => e.target.src = "/default-ad.png"} 
            />
            <div className="flex text-sm flex-col px-3 gap-1">
              <div className='font-bold text-black'>{ad.title}</div>
              <div>{ad.description}</div>
            </div>
          </a>
        )}
      </div>
    </HelmetProvider>
  );
}

export default Ads;
