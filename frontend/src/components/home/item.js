import React, { useState } from "react";
import "./item.css"

export default function PostItem(props){
    const post = props.post;
    const [title, setTitle] = useState(post.title);
    const [text, setText] = useState(post.text);

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
                    onClick={()=>{props.updateItem(props.id, {title: title, text: text})}}>
                    Update
                </div>
                <div  
                    className="postActions" 
                    onClick={()=>{props.delete(props.id)}}>
                    Delete
                </div>
            </div>
        </div>
    );
}