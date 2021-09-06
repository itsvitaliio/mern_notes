import React, { useState, useEffect } from "react";
import "./item.css"

export default function ItemEditor(props){
    const [title, setTitle] = useState();
    const [text, setText] = useState();

    return (
        <div className="post">
            <input 
                value={title}
                onChange={e=>setTitle(e.target.value)}
                />
            <textarea 
                value={text}
                onChange={e=>setText(e.target.value)}
                />
            <div className="postActions">
                <div className="postActions"
                    onClick={()=>{props.add({title: title, text: text})}}>
                    Save
                </div>
                <div  
                    className="postActions" 
                    >
                    Cancel
                </div>
            </div>
        </div>
    );
}