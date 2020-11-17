import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

const Reptile = (props) => {
  const [reptile, setReptile] = useState({});
  const [entries, setEntries] = useState([]);
    useEffect(async () => {
        const getReptile = async () => {
            const response = await fetch(`http://localhost:3000/reptiles/${props.reptileId}`);
            const data = await response.json();
            return data;
        };
    const reptile = await getReptile();
    setReptile(reptile);
        
        const getEntries = async () =>{
            const response = await  fetch(`http://localhost:3000/reptiles/${props.reptileId}/logs`);
            const data = await response.json();
            return data;
    };
    const entries = await getEntries();
    setEntries(entries);
  }, []);
    
    return(
     <div className="reptile">
        <h2>{reptile.name}</h2>
        <p>{reptile.morph}</p>
        {
        /// pick up with this hereDisplay the latest entry

        }
        <Link to={`/reptiles/${reptile.id}/logs`}><p>More Entries</p></Link>
        </div>
    )
};

export default Reptile;