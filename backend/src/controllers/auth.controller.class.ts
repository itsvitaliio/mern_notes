import * as express from 'express';
import userModel from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UsersController {
  public addUser = async (username : string, password:string, response: express.Response)=>{
    const user = await userModel.findOne({username: username});
    if(!user){
      const newUser = {
        username: username,
        password: password,
        salt: await bcrypt.genSalt(),
        posts: []
      }
      const dbAddition = new userModel(newUser);
      await dbAddition.save();
      response.status(200).send('Successfully added user to the database');
    }else{
      response.status(409).send('User already exists');
    }    
  }

  public getUser = async (username : string, response: express.Response)=>{
      const user = await userModel.findOne({username: username});
      if(!user){
        console.log('User does not exist');
        response.status(409).send('User does not exist');
        return;
      }else{
        return user;
      }
  }

  public checkPassword = async (user:any, password : string, response: express.Response)=>{
      if(user){
        console.log('User exists');
        return await bcrypt.compare(password, user.password);
      }
  }   

  public createJwt(user:any, response: express.Response){
    let token = jwt.sign({user_id: user._id}, user.salt);
    response.cookie("token", token, {
      httpOnly: true,
      sameSite: 'strict'
    });
    console.log('Successfully logged user in');
    response.status(200).send('Successfully logged user in');
  }

  public verifyJwt = (user:any, token : any, response: express.Response)=>{
      if(user){
        if((jwt.verify(token, user.salt) as any).user_id==user._id){
          response.status(200).send('User authenticated');
        }else{
          response.status(409).send('Bad cookie');
        }
      }
  }
}
 
export default UsersController;