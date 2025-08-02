'use client';

import { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setLocation } from '@/store/generalSlice';
import ToastViewer from '@/components/common/ToastViewer';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LocationPopup() {
  const dispatch = useDispatch();
const locationPopup = useSelector((state: RootState) => state.general.location);
  const [info, setInfo] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('locationPopup',locationPopup);
    
    const fetchCityInfo = async () => {
      if (!locationPopup.city) return;

      setLoading(true);
      try {
        const citySlug = locationPopup.city
          .trim()
          .toLowerCase()
          .replace(/'/g, '')
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9\-]/g, '');

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms/?category=regions&page=${citySlug}`);
        const data = await res.json();
        setInfo(data.content || "");
      } catch (error) {
        console.error('Failed to fetch city info:', error);
        setInfo("");
      } finally {
        setLoading(false);
      }
    };

    fetchCityInfo();
  }, [locationPopup.city]);

const handleClose = () => {
  dispatch(setLocation({ show: false, city: '' })); 
};

  return (
    <Modal size="xl" show={locationPopup.show} onHide={handleClose} centered>
      <Modal.Body>
        <div>
          <div className="flex justify-between">
            <h2>{locationPopup.city}</h2>
            <a type="button" className="p-2" onClick={handleClose}>
              <RxCross1 size="18px" />
            </a>
          </div>


          <div>
            {loading ? (
              <p>Loading content...</p>
            ) : info?.length > 0 ? (
              <ToastViewer key={locationPopup.city} content={info} loading={false} />
            ) : (
              <p>No activities found for this region.</p>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
