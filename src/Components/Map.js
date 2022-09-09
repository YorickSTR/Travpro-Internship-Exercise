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

const Map = ({ items, marker, handleCoordsApp }) => {
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(11);
  const [activeMarker, setActiveMarker] = useState(null);
  const [mapInst, setMapInst] = useState(null);

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

  const handleCoords = (e) => {
    let bounds = mapInst.getBounds();
    let ne = bounds.getNorthEast();
    let sw = bounds.getSouthWest();
    handleCoordsApp(ne.lat(), sw.lat(), ne.lng(), sw.lng());
  };

  useEffect(() => {
    if (marker) {
      handleActiveMarker(marker.listing_id);
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

  const onLoad = React.useCallback(function onLoad(mapInstance) {
    setMapInst(mapInstance);
  });

  return isLoaded ? (
    <GoogleMap
      className="Map"
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onBoundsChanged={(e) => handleCoords(e)}
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
                <div>
                  <b>{item.company}</b>
                  <p>
                    {item.zip}
                    <span>, </span>
                    <span> {item.city} </span>
                    <p>{item.addr1}</p>
                  </p>
                  <a className="callHotelBtn" href={"tel: " + item.phone}>
                    Call
                  </a>
                </div>
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
