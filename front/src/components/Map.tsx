import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

declare global {
  interface Window {
    initMap: () => void;
  }
}

interface MapProps {
  lat: number;
  lng: number;
}

const MapStyle = styled.div`
    width: 100%;
    height: 50%;
`

const Map: React.FC<MapProps> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapObjRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLng | null | undefined>(null);
  const [markerTitle, setMarkerTitle] = useState<string | null | undefined>(null);


  useEffect(() => {
    const markerClickEvent = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail === 'marker1' || customEvent.detail === 'marker2') {
        setIsOpen(true);
      }
    };
    
    window.addEventListener('markerClick', markerClickEvent);

    return () => {
      window.removeEventListener('markerClick', markerClickEvent);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `http://maps.googleapis.com/maps/api/js?libraries=geometry&key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}&callback=initMap`;
    script.async = true;
    
    const existingScript = document.querySelector(`script[src="${script.src}"]`);
    if (!existingScript) {
      document.body.appendChild(script);
    }

    window.initMap = () => {
      const mapOptions = {
        center: { lat: 37.5494, lng: 126.9712 },
        zoom: 11.5,
      };

      mapObjRef.current = new window.google.maps.Map(mapRef.current!, mapOptions);

      const marker1 = new window.google.maps.Marker({
        position: { lat: 37.5455, lng: 126.9613 },
        title: "177-18, Hyochangwon-ro, Yongsan-gu, Seoul, Republic of Korea",
      });

      const marker2 = new window.google.maps.Marker({
        position: { lat: 37.5526, lng: 126.9864 },
        title: "231, Samil-daero, Jung-gu, Seoul, Republic of Korea",
      });

      markersRef.current = [marker1, marker2];
      markersRef.current.forEach(marker => marker.setMap(mapObjRef.current));

      marker1.addListener("click", () => {
        setMarkerPosition(marker1.getPosition());
        setMarkerTitle(marker1.getTitle());
        window.dispatchEvent(new CustomEvent('markerClick', { detail: 'marker1' }));
      });
      
      marker2.addListener("click", () => {
        setMarkerPosition(marker2.getPosition());
        setMarkerTitle(marker2.getTitle());
        window.dispatchEvent(new CustomEvent('markerClick', { detail: 'marker2' }));
      });

    return () => {
      document.body.removeChild(script);
    };
    }
  }, []);

  useEffect(() => {
    if (mapObjRef.current) {
      mapObjRef.current.setCenter({ lat: lat, lng: lng });
    }
  }, [lat, lng]);

  return (
    <>
      <MapStyle>
        <div ref={mapRef} style={{ width: '100%', height: '75vh' }}/>
      </MapStyle>
      {isOpen && (
        <Modal
          title={markerTitle}
          latlng={markerPosition}
          onClick={() => setIsOpen(false)} 
          />
      )}
    </>
  );
};

export default Map;
