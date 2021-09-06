import * as express from 'express';
import UsersController from './auth.controller.class';
import { UserPlan } from '../models/user';

class UsersUpdater {
  private userCtrl = new UsersController();
  public updatePosts = async (username : string, posts:Array<Object>, response: express.Response)=>{
    const user = await this.userCtrl.getUser(username, response);
    if(user){
      (user as UserPlan).posts = posts;
      user.save();
      response.status(200).send(posts);
    }   
  }

  public getPosts = async (username : string, response: express.Response)=>{
    const user = await this.userCtrl.getUser(username, response);
    if(user){
      response.status(200).send((user as UserPlan).posts);
    }
  }

  public changeUsername = async (username : string, password : string, newUsername : string, response: express.Response)=>{
    const user = await this.userCtrl.getUser(username, response);
    if(await this.userCtrl.checkPassword(user, password, response)){
      (user as UserPlan).username = newUsername;
      (user as UserPlan).save();
      this.userCtrl.createJwt(user, response);
    }
  }

  public changePassword = async (username : string, password : string, newPassword : string, response : express.Response)=>{
    const user = await this.userCtrl.getUser(username, response);
    if(await this.userCtrl.checkPassword(user, password, response)){
      (user as UserPlan).password = newPassword;
      if(user){
        user.save();
      }
      response.status(200).send('Successfully changed the password');
      response.clearCookie("token");
    }
  }

  public deleteUser = async (username : string, password : string, response : express.Response)=>{
    const user = await this.userCtrl.getUser(username, response);
    if(await this.userCtrl.checkPassword(user, password, response)){
      (user as any).delete(); 
      response.clearCookie("token", {path:'/'});
      response.status(200).send('Successfully deleted the user'); 
    }
  }
}
 
export default UsersUpdater;