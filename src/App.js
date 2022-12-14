import { React, useState, useEffect } from "react";
import List from "./Components/List";
import Map from "./Components/Map";

import "./App.scss";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [items, setItems] = useState([]);
  const [marker, setMarker] = useState();
  const [coords, setCoords] = useState({
    lat1: 36.5098445064823,
    lat2: 35.74337885497288,
    lng1: -114.83208606646728,
    lng2: -115.48191020892334,
  });

  const handleCoords = (lat1, lat2, lng1, lng2) => {
    setCoords({ lat1: lat1, lat2: lat2, lng1: lng1, lng2: lng2 });
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://travpro.yourworldapps.nl/API/app/v2/listings.php?app=las-vegas&lat1=${coords.lat1}&lat2=${coords.lat2}&lon1=${coords.lng1}&lon2=${coords.lng2}?category=&query=`
      );
      const locations = await result.json();
      setItems(locations);
    };
    fetchData();
  }, [coords]);

  return (
    <div className="App">
      <List items={items} onClick={setMarker} />
      <Map items={items} marker={marker} handleCoordsApp={handleCoords} />
    </div>
  );
};
