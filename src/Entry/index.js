import React, { useState, useEffect } from "react";

const Entry = (props) => {
  const [entry, setEntry] = useState({});
    
    useEffect(async () => {
        const getReptile = async () => {
            const response = await fetch(`http://localhost:3000/reptiles/${props.reptileId}`);
            const data = await response.json();
            return data;
        };
    const reptile = await getReptile();
    setReptile(reptile);
  }, []);
    
    return(
     <div className="reptile">
        <h2>{reptile.name}</h2>
        <p>{reptile.morph}</p>
        </div>
    )
};

export default Reptile;