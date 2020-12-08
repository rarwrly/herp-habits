import React, { useState, useEffect } from "react";
import {useForm} from "react-hook-form";

const LogForm = (props) => {

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
        props.setEntries([createdLog, ...entries]);
    };
    
    return (
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
    )
  }
  export default LogForm;