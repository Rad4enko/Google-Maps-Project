import React from 'react'
import { GoogleMap } from "@react-google-maps/api"
import s from './Map.module.css'

const containerStyle = {
    width: '100%',
    height: '100%'
  };

export default function Map({center}) {
  const mapRef = React.useRef(undefined)

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = undefined;
  }, [])

    return <div className={s.container}>
     <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
     </GoogleMap>
    </div>
} 
