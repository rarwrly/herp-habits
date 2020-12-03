import React, { useState, useEffect } from "react";
import {useForm} from "react-hook-form";
import { Link } from "@reach/router";

const Entry = (props) => {
  const [reptile, setReptile] = useState({});
  const [entries, setEntries] = useState([]);
    
    const { register, handleSubmit, reset, errors} =useForm(); 
    const onSubmit = async (formData) =>{
        const response = await fetch(
            `http://localhost:3000/reptiles/${props.reptileId}/logs?_sort=date&_order=desc`,
            {
                method: 'POST', 
                body: JSON.stringify(formData),
                headers:{
                "Content-Type":"application/json",
                },
            }
        );
        
        const createdLog= await response.json();
        reset();  
        setEntries([...entries, createdLog]);
    };
    

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <lable>Date</lable>
            <input name="date" type="date" ref={register({ required:"You must enter a date"})}/>
                {errors.date && errors.date.message}
            <lable>Comments</lable>
            <input name="comments" ref={register({ required:"You must enter a comment"})}/>
                {errors.comments && errors.comments.message}
            <input type="submit" value="Submit Log Entry"/>
        </form>
                        <Link to={`/reptiles/${reptile.id}`}>
        <p>{reptile.name}</p>
        </Link>
    <Link to ={'/'}> Main Page</Link>
        </div>
    )
};

export default Entry;