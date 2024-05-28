import React from 'react';
import { GoogleMap, Marker} from "@react-google-maps/api";
import s from 'map.module.css'; // Путь к файлу стилей
import { defaultTheme } from './Map/Theme';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollweel: false,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  styles: defaultTheme
}

export function Map({ center }) {
  const mapRef = React.useRef(undefined);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  return (
    <div className={s.splitContainer}>
      <div className={s.leftPane}>
        {/* Левая часть экрана */}
        <h2>Левая часть</h2>
        {/* содержимое левой части */}
      </div>
      <div className={s.rightPane}>
        {/* Правая часть экрана с картой */}
        <div className={s.mapContainer}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={defaultOptions}
          >
            <Marker position={center}/>
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}
