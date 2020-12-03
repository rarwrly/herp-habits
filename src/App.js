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
    <div className="app">
      {reptiles.map((reptile) => (
        <Link to={`/reptiles/${reptile.id}`}>
        <p>{reptile.name}</p>
        </Link>
      ))}
    </div>
  );
}

export default App;
