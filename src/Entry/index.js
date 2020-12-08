import React, { useState, useEffect } from "react";
import {useForm} from "react-hook-form";
import { Link } from "@reach/router";

const Entry = (props) => {
  const [reptile, setReptile] = useState({});
  const [entries, setEntries] = useState([]);
    
  const [selectedOption, setSelectedOption] = useState("no food offered"); 
    const { register, handleSubmit, reset, errors} =useForm(); 
    const onSubmit = async (formData) =>{
        const response = await fetch(
            `http://localhost:3000/reptiles/${props.reptileId}/logs`,
            {
                method: 'POST', 
                body: JSON.stringify(formData),

                headers:{
                "Content-Type":"application/json",
                },
            }
        );
        
        console.log(formData);
        const createdLog= await response.json();
        reset();  
        setEntries([createdLog, ...entries]);
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
    
    getEntries();
  }, []);
    
    return(
     <div className="entries">
        <p>Logs Page</p>
                {entries.map((entry)=>{
          return(
            <div className="entry">
                <h2>{entry.date}</h2>
                <p>{entry.comments}</p>
                <p>{entry.preyItems}</p>
            </div>
         );
        })}
        <form onSubmit={handleSubmit(onSubmit)}>
           <ul class="formWrapper">
                <li class="formItem"><lable>Date</lable>
                    <input name="date" type="date" ref={register({ required:"You must enter a date"})}/>
                    {errors.date && errors.date.message}
                </li>
                <li class="formItem"><lable>Comments</lable>
                    <input name="comments" ref={register({ required:"You must enter a comment"})}/>
                    {errors.comments && errors.comments.message}
                </li>
                <li class="formItem"><lable>Prey Items:</lable>
                    <select name="preyItems"ref={register({required: "You must select an option"})}
                    defaultValue={"no food offered"}>
                        <option value="1 rat">1 rat </option>
                        <option value="1 rat, 1 mouse">1 rat, 1 mouse</option>
                        <option value="2 mice">2 mice</option>
                        <option value="refused prey item">refused prey item</option>
                        <option value="no food offered">no food offered</option>
                    </select>
                </li>
                <li class="formItem"><input type="submit" value="Submit Log Entry"/>
                </li>
           </ul>  
        </form>
                        <Link to={`/reptiles/${reptile.id}`}>
        <p>{reptile.name}</p>
        </Link>
    <Link to ={'/'}> Main Page</Link>
        </div>
    )
};

export default Entry;