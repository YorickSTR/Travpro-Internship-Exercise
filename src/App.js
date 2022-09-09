import { React, useState, useEffect } from "react";
import List from "./Components/List";
import Map from "./Components/Map";
import "./App.scss";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [items, getItems] = useState([]);
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

  const fetchData = async () => {
    const response = await fetch(
      "https://travpro.yourworldapps.nl/API/app/v2/listings.php?app=las-vegas&lat1=" +
        coords.lat1 +
        "&lat2=" +
        coords.lat2 +
        "&lon1=" +
        coords.lng1 +
        "&lon2=" +
        coords.lng2 +
        "?category=&query="
    );
    console.log(coords);
    if (!response.ok) {
      throw new Error("Error fetching data");
    } else {
      return response.json();
    }
  };
  useEffect(() => {
    fetchData()
      .then((result) => {
        getItems(result);
        console.log("results");
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [coords]);

  return (
    <div className="App">
      <List items={items} onClick={setMarker} />
      <Map items={items} marker={marker} handleCoordsApp={handleCoords} />
    </div>
  );
};
