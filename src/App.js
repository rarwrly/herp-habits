import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import "./App.css";

function App() {
  const [reptiles, setReptiles] = useState([]);

  useEffect(async () => {
    const getReptiles = async () => {
      const response = await fetch("http://localhost:3000/reptiles");
      const data = await response.json();
      return data;
    };
      
    const reptiles = await getReptiles();
    setReptiles(reptiles);
    

  }, []);

  return (
    <div className="App">
      {reptiles.map((reptile) => (
        <div className="ReptileLink">
          <Link to={`/reptiles/${reptile.id}`}>
          <h1>{reptile.name}</h1>
          <img src={reptile.imgUrl} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default App;
