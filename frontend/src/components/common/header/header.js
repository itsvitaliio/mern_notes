import React from "react";
import "./header.css"


export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }


    render(){
        return(
            <div className="header">
                <div className="actionsContainer">
                    <div onClick={()=>this.props.changePage('home')}>Home</div>
                    <div onClick={()=>this.props.changePage('profile')}>Profile</div>
                </div>
                <div className="logoutContainer" onClick={this.props.abandon}>
                    Logout
                </div>
            </div>
        );
    }
}