import React, { useState } from "react";

import axios from "axios";

import "../../components/authentication/input/field.css";
import "./profile.css";

export default function ProfilePage(props){
    const [section, setSection] = useState('');
    const [username, setUsername] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    function changeUsername(){
        axios.post('http://localhost:9000/changeUsername', {
            username: username,
            newUsername: newUsername,
            password: password,
        }, {withCredentials: true})
        .then((res)=>{
            if(res.status===200){
                localStorage.setItem('username', newUsername);
            }else{
              console.log('Incorrect password');
            }
            
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    function changePassword(){
        axios.post('http://localhost:9000/changePassword', {
            username: username,
            password: password,
            newPassword: newPassword
        }, {withCredentials: true})
        .then((res)=>{
            if(res.status===200){
                console.log('Successfully updated password')
            }else{
              console.log('Incorrect password');
            }
            
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    function deleteUser(){
        axios.post('http://localhost:9000/deleteUser', {
            username: username,
            password: password
        }, {withCredentials: true})
        .then((res)=>{
            if(res.status===200){
                console.log('Successfully deleted user');
                props.abandon();
                
            }else{
              console.log('Incorrect password');
            }
            
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    function renderUsernameChange(section){
        let returnItem;
        if(section === 'username'){
            returnItem = 
            <div className="profileForm">
                <input 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"/>
                <input
                    value={newUsername}
                    onChange={e => setNewUsername(e.target.value)}
                    placeholder="Enter new username"/>
                <input
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    placeholder="Password"/>
                <div
                    className="actionDiv doDiv"
                    onClick={changeUsername}>
                        Change your username
                </div>
            </div>
        }else{
            returnItem = 
                <div 
                    className="actionDiv"
                    onClick={()=>setSection('username')}>
                        Change username
                </div>
        }
        return returnItem;
    }
    function renderPasswordChange(section){
        let returnItem;
        if(section === 'password'){
            returnItem =
            <div className="profileForm">
                <input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"/>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"/>
                <input
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)} 
                    placeholder="Enter new password"/>
                <div
                    className="actionDiv doDiv"
                    onClick={changePassword}>
                        Change your password
                </div>
            </div>
        }else{
            returnItem = 
                <div
                    className="actionDiv"
                    onClick={() => setSection('password')}>
                        Change password
                </div>
        }
        return returnItem;
    }
    function renderDeleteAccount(section){
        let returnItem;
        if(section === 'delete'){
            returnItem =
                <div className="profileForm">    
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"/>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"/>
                    <div
                        className="actionDiv warnDiv"
                        onClick={deleteUser}>
                            Delete your account
                    </div>
                </div>
        }else{
            returnItem = 
                <div
                    className="actionDiv"
                    onClick={() => setSection('delete')}>
                        Delete Account
                </div>
        }
        return returnItem;
    }

    return(
        <div className="profilePage">
            {renderUsernameChange(section)}   
            {renderPasswordChange(section)}                
            {renderDeleteAccount(section)}                             
        </div>
    );
}