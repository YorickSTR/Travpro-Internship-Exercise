import { React } from "react";
import styled from "styled-components";

const List = ({ items, onClick }) => {
  let resultAmount = "Loading results...";
  if (items.length > 0) {
    resultAmount = "Amount of results: " + items.length;
  }

  const P = styled.p`
    text-transform: uppercase;
    padding-left: 20px;
  `;

  const ListItem = styled.div`
    height: 190px;
    background-color: white;
    box-shadow: 0.5px 0.5px 5px #aaaaaa;
    width: 376px;
    margin-left: 15px;
    margin-top: 15px;
    display: inline-block;
    padding-top: 30px;
  `;

  const ItemInfo = styled.div`
    padding: 20px;
  `;

  const Button = styled.button`
    background-color: rgb(182, 156, 83);
    color: white;
    border: 0;
    padding: 8px;
    float: right;
    margin-right: 20px;
    margin-top: -50px;
  `;

  const Text = styled.p`
    margin: 0px;
    color: ${(props) => (props.gold ? "rgb(182, 156, 83)" : "black")};
    font-weight: ${(props) => (props.bold ? "900" : "100")};
  `;

  const List = styled.section`
    width: 60vw;
    margin: 0;
    display: flex;
  `;

  return (
    <List>
      <div className="List">
        <P className="resultsText">
          <p id="amount"> {resultAmount} </p>
        </P>
        {items.map((item) => (
          <ListItem>
            <div key={item.company} className="Item">
              <ItemInfo>
                <Text gold bold id="company">
                  {item.company}
                </Text>
                <Text bold> {item.city} </Text>
                <Text> + {item.phone} </Text>
                <Text> {item.addr1} </Text>
                <Text gold>
                  <a>Accomodations</a>
                </Text>
              </ItemInfo>
              <Button className="OnMapBtn" onClick={() => onClick(item)}>
                On Map
              </Button>
            </div>
          </ListItem>
        ))}
      </div>
    </List>
  );
};

export default List;
