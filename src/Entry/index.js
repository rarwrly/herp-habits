import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

const Entry = (props) => {
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
            const response = await  fetch(`http://localhost:3000/reptiles/${props.reptileId}/logs?_sort=date&_order=asc`);
            const data = await response.json();
            return data;
    };
    const entries = await getEntries();
    setEntries(entries);
  }, []);
    
    return(
     <div className="entries">
        <p>Logs Page</p>
                {entries.map((entry)=>{
          return(
            <div className="entry">
                <h2>{entry.date}</h2>
                <p>{entry.comments}</p>
            </div>
         );
        })}
                        <Link to={`/reptiles/${reptile.id}`}>
        <p>{reptile.name}</p>
        </Link>
    <Link to ={'/'}> Main Page</Link>
        </div>
    )
};

export default Entry;