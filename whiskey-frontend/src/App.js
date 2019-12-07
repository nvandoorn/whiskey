import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

async function getDataFromServer(partNumber) {
  let response = await fetch(`http://localhost:4567/parts/${partNumber}`);
  return response.json();
}

function App() {
  let [currentPartNumber, setCurrentPartNumber] = useState("");
  let [currentPart, setCurrentPart] = useState(null);
  useEffect(() => {
    getDataFromServer("partone").then(serverData => {
      setCurrentPart(serverData);
    });
    console.log("hi")
    return () => {};
  }, []);

  function handleTextChange(text) {
    setCurrentPartNumber(text)
    getDataFromServer(text).then(serverData => {
      setCurrentPart(serverData);
    });
  }

  if (!currentPart) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <td>Name</td>
              <td>Unit</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{currentPart.name}</td>
              <td>{currentPart.unit}</td>
              <td>{currentPart.price}</td>
            </tr>
          </tbody>
        </table>
        <input type="text" onChange={e => handleTextChange(e.target.value)} value={currentPartNumber} />
      </div>
    );
  }
}

export default App;
