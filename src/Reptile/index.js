import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import LogEntry from "../LogEntry";

const Reptile = (props) => {
  const [reptile, setReptile] = useState([]);
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
            const response = await  fetch(`http://localhost:3000/reptiles/${props.reptileId}/logs?_sort=date&_order=desc&_limit=3`);
            const data = await response.json();
            return data;
    };
    const entries = await getEntries();
    setEntries(entries);
    
    getReptile();
    getEntries();
    
    const firstLog= entries[0];
    console.log(firstLog)
    console.log(firstLog.date)
    console.log(firstLog.comments)
    console.log(entries)
  }, []);

 
    return(
     <div className="reptile">
        <h2>{reptile.name}</h2>
        <div>{reptile.emoji}</div>
        <p>Breed: {reptile.commonName}</p>
        <p>Morph: {reptile.morph}</p>
      
    
        <div className="log">
        <h2>Latest Logs</h2>
        {entries.map((entry)=>{
            return <LogEntry date={entry.date} comments={entry.comments} preyItems={entry.preyItems}/>;
            })}  

        </div>
        <Link to={`/reptiles/${reptile.id}/logs?_sort=date&_order=desc`}><p>More Entries</p></Link>
                <Link to ={'/'}> Main Page</Link>
        </div>

    )
};

export default Reptile;