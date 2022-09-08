import { React } from "react";
import List from "./Components/List";
import Map from "./Components/Map";
import "./App.scss";

export default () => {
  return (
    <div className="App">
      <List />
      <Map />
    </div>
  );
};
