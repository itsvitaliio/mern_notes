import React from 'react';

import Header from './components/common/header/header';

import AuthPage from './pages/authentication/authPage';
import Homepage from './pages/home/home';
import ProfilePage from './pages/profile/profile';

import axios from 'axios';
export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      authenticated: false,
      pageName: 'home'
    }
  }

  componentDidMount(){
    if(localStorage.getItem('username')){
      axios.post('http://localhost:9000/authenticate', {
                username: localStorage.getItem('username'),
            }, {withCredentials: true})
            .then((res)=>{
                if(res.status===200){
                    this.authenticate();
                }else{
                  console.log('Bad cookie');
                }
                
            })
            .catch((err)=>{
                console.log(err);
            });
    }
  }
  
  authenticate = () =>{
    this.setState({authenticated: true});
  }

  abandon = () =>{
    axios.post('http://localhost:9000/logout', {
                username: localStorage.getItem('username'),
            }, {withCredentials: true})
            .then((res)=>{
                if(res.status===200){
                  console.log('You are logged out');
                  localStorage.removeItem('username');
                  this.setState({authenticated: false});
                }
            })
            .catch((err)=>{
                console.log(err);
            });
  }

  changePage = (page) =>{
    if(page==='logout'){

    }else{
      this.setState({pageName:page});
    }
  }

  headerManager = (state) =>{
    if(state.authenticated){
      return <Header changePage={this.changePage.bind(this)} abandon={this.abandon.bind(this)}/>
    }
  }

  pageManager = (state) =>{
    let page = null;
    if(state.authenticated){
      switch(state.pageName){
        default:
          break;
        case 'home':
          page = <Homepage/>;
          break;
        case 'profile':
          page = <ProfilePage abandon={this.abandon.bind(this)}/>;
          break;
      }
    }else{
      page = <AuthPage authenticate={this.authenticate.bind(this)}/>
    }
    return page;
  }

  render(){
    return (
      <div className="App">
        {this.headerManager(this.state)}
        {this.pageManager(this.state)}
      </div>
    );
  }
}