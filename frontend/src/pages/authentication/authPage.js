import React from "react";
import '../../components/authentication/input/field.css';
import '../../components/authentication/buttons/authBtns.css';
import './authPage.css';

import axios from "axios";

export default class AuthPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mode: 'register',
        }
    }

    register = () =>{
        console.log('Pressed sign up');
        const state = this.state;
        if(state.username&&state.password&&state.confirmPassword){
            console.log("All fields are filled.")
            if(state.password===state.confirmPassword){
                console.log("Passwords match");
                axios.post('http://localhost:9000/register', {
                    username: state.username,
                    password: state.password
                })
                .then(async (res)=>{
                    if(res.status===200){
                        this.login();
                    }
                })
                .catch((err)=>{
                    console.log(err);
                });
            }
        }
    }

    login = () =>{
        const state = this.state;
        if(state.username&&state.password){
            axios.post('http://localhost:9000/login', {
                username: state.username,
                password: state.password
            }, {withCredentials: true})
            .then((res)=>{
                console.log("Response");
                if(res.status===200){
                    localStorage.setItem('username', state.username);
                    this.props.authenticate();
                }else{
                    console.log(res.status);
                    console.log(res.data);
                }
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    }

    switchMode = () =>{
        if(this.state.mode==='register'){    
            this.setState({
                mode: 'login'
            })
        }else{  
            this.setState({
                mode: 'register'
            })
        }
    }

    updateUsername = (e) =>{
        this.setState({
            username: e.target.value,
        })
    }
    updatePassword = (e) =>{
        this.setState({
            password: e.target.value,
        })
    }
    updateConfirmPassword = (e) =>{
        this.setState({
            confirmPassword: e.target.value,
        })
    }

    confirmPasswordRender = (state) =>{
        if(state.mode==='register'){
            return <input value={this.state.confirmPassword}
                onChange={this.updateConfirmPassword}
                placeholder="Confirm Password"/>;
        }
    }

    actionBtnRender = (state) =>{
        let action;
        let text;
        if(state.mode==='register'){
            text = 'Sign Up'
            action = this.register;
        }else{
            text = 'Log In'
            action = this.login;
        }
        
        return <div className="authBtn" onClick={action}>{text}</div>
    }

    switchBtnRender = (state) =>{
        let text = 'Log In'

        if(state.mode==='register'){
            text = 'Log In';
        }else{
            text = 'Sign Up';
        }
        
        return <div className="authBtn" onClick={this.switchMode}>{text}</div>
    }

    render(){
        return(
            <div className="body">
                <input value={this.state.username} onChange={this.updateUsername} placeholder="Username"/>
                <input value={this.state.password} onChange={this.updatePassword} placeholder="Password"/>
                {this.confirmPasswordRender(this.state)}
                {this.actionBtnRender(this.state)}
                {this.switchBtnRender(this.state)}
            </div>
        );
    }

}