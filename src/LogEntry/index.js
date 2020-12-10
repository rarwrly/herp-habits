import React, { useState, useEffect } from "react";

const LogEntry = (props) => {

    return(
            <div className="logEntry">
                <h2>{props.date}</h2>
                <p>Comment: {props.comments}</p>
                <p>Food: {props.preyItems}</p>
            </div>
         );
};

export default LogEntry;