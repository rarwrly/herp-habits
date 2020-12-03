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
            const response = await  fetch(`http://localhost:3000/reptiles/${props.reptileId}/logs?_sort=date&_order=desc`);
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
        <div className="log">
        <h2>Latest Log</h2>

        </div>

        <Link to={`/reptiles/${reptile.id}/logs?_sort=date&_order=desc`}><p>More Entries</p></Link>
                <Link to ={'/'}> Main Page</Link>
        </div>

    )
};

export default Reptile;