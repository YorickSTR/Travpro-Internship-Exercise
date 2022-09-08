import { React } from "react";

const List = ({ items, onClick }) => {
  let resultAmount = "Loading results...";
  if (items.length > 0) {
    resultAmount = "Amount of results: " + items.length;
  }
  return (
    <div className="List">
      <p id="amount"> {resultAmount} </p>
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
