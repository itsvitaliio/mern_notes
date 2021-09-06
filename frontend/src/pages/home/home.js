import React from "react";
import axios from "axios";
import PostItem from "../../components/home/item";
import ItemEditor from "../../components/home/itemEditor";
export default class Homepage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount = () =>{
        axios.post('http://localhost:9000/getPosts', {
            username: localStorage.getItem('username')
        })
        .then((res)=>{
            if(res.status===200){
                if(res.data){
                    this.setState({posts: res.data});
                }
            }
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    sendToServer = () =>{
        axios.post('http://localhost:9000/updatePosts', {
            username: localStorage.getItem('username'),
            posts: this.state.posts
        })
        .then((res)=>{
            if(res.status===200){
              this.setState({posts: res.data});
            }
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    addItem = async (item) =>{
        let posts = this.state.posts;
        posts.push(item);
        await this.setState({posts: posts})
        this.sendToServer();
    }

    updateItem = async (id, item) =>{
        let posts = this.state.posts;
        posts[id] = item;
        this.setState({posts: posts});
        this.sendToServer();
    }

    deleteItem = async (id) =>{
        let posts = this.state.posts;
        posts.splice(id, 1);
        this.setState({posts: posts});
        this.sendToServer();
    }

    renderItems = (state) =>{
        return state.posts.map((post, index) =>
            <PostItem id={index} post={post} updateItem={this.updateItem} delete={this.deleteItem}/>
        );
    }

    render() {
        console.log(this.state);
        return (
             <div>
                 <ItemEditor add={this.addItem}/>
                 {this.renderItems(this.state)}
             </div>
        );
    }
}