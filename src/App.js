import { React, useState, useEffect } from "react";
import List from "./Components/List";
import Map from "./Components/Map";
import "./App.scss";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [items, getItems] = useState([]);
  const [marker, setMarker] = useState();

  const fetchData = async () => {
    const response = await fetch(
      "https://travpro.yourworldapps.nl/API/app/v2/listings.php?app=las-vegas&lat1=36.5098445064823&lat2=35.74337885497288&lon1=-114.83208606646728&lon2=-115.48191020892334?category=&query="
    );
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
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <div className="App">
      <List items={items} onClick={setMarker} />
      <Map items={items} marker={marker} />
    </div>
  );
};
