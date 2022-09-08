import { React, useState, useEffect } from "react";
import List from "./Components/List";
import Map from "./Components/Map";
import "./App.scss";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [items, getItems] = useState([]);
  const [marker, setMarker] = useState();

  const fetchData = async () => {
    let lat1 = 36.5098445064823;
    let lat2 = 35.74337885497288;
    let long1 = -114.83208606646728;
    let long2 = -115.48191020892334;
    const response = await fetch(
      "https://travpro.yourworldapps.nl/API/app/v2/listings.php?app=las-vegas&lat1=" +
        lat1 +
        "&lat2=" +
        lat2 +
        "&lon1=" +
        long1 +
        "&lon2=" +
        long2 +
        "?category=&query="
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
