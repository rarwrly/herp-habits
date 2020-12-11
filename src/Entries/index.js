import React, { useState, useEffect } from "react";

import { Link } from "@reach/router";
import LogEntry from "../LogEntry";
import Form from "../Form";
const Entries = (props) => {
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
    
    getEntries();
  }, []);
    
    return(
     <div className="entries">
        <h1>Logs Page</h1>
            {entries.map((entry)=>{
            return <LogEntry date={entry.date} comments={entry.comments} preyItems={entry.preyItems}/>;
            })}
            <Form setEntries={setEntries} entries={entries} reptileId={reptile.id} />
                        <Link to={`/reptiles/${reptile.id}`}>
        <p>{reptile.name}</p>
        </Link>
    <Link to ={'/'}> Main Page</Link>
        </div>
    )
};

export default Entries;