import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "50%",
  height: "100vh",
};

const defaultCenter = {
  lat: 36.169941,
  lng: -115.139832,
};

const Map = ({ items, marker }) => {
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(11);
  const [activeMarker, setActiveMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBpfyrBMTrgHH3YnaGHxfjEN_w7OXBJoqc",
  });

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  useEffect(() => {
    if (marker) {
      setCenter({
        lat: Number(marker.latitude),
        lng: Number(marker.longitude),
      });

      setZoom(15);
      console.log(Number(marker.latitude));
      console.log(Number(marker.longitude));
    }
  }, [marker]);

  // useEffect(() => {
  //   Map.onBoundsChanged(() => {
  //     console.log("asd");
  //   });
  // });

  return isLoaded ? (
    <GoogleMap
      className="Map"
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onDrag={(e) => console.log("dragging")}
      onClick={() => setActiveMarker(null)}
    >
      {items.map((item) => {
        let position = {
          lat: Number(item.latitude),
          lng: Number(item.longitude),
        };

        return (
          <Marker
            className="Marker"
            useJsApiLoader
            key={item.listing_id}
            position={position}
            onClick={() => handleActiveMarker(item.listing_id)}
          >
            {activeMarker === item.listing_id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>{item.company}</div>
              </InfoWindow>
            ) : null}
          </Marker>
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
