import { React, useState, useEffect } from "react";

const List = ({ items, onClick }) => {
  return (
    <div className="List">
      <p id="amount"> Amount of results: {items.length} </p>
      {items.map((item) => (
        <div key={item.company} className="Item">
          <p id="company"> {item.company} </p>
          <p> {item.city} </p>
          <p> + {item.phone} </p>
          <p> {item.addr1} </p>
          <button className="OnMapBtn" onClick={() => onClick(item)}>
            On Map
          </button>
        </div>
      ))}
    </div>
  );
};

export default List;
