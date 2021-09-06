import express from 'express';
import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserPlan extends mongoose.Document{
  username: string;
  password: string;
  salt: string;
  posts: Array<Object>;
}

const userSchema = new mongoose.Schema({
  username: {
    type : String,
  },
  password: {
    type : String,
  },
  salt: {
    type : String,
  },
  posts: {
    type : Array,
  }
}, { collection: 'Users' });

userSchema.pre('save', async function (this:UserPlan, next:mongoose.HookNextFunction){
  if(!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, this.salt);
  return next();
});

const userModel = mongoose.model('UserModel', userSchema);
export default userModel;