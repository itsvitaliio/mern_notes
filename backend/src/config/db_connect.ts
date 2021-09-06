import mongoose from 'mongoose';
import { connection } from 'mongoose';
import ConfigEnv from './configEnv';

function Connect(){
    mongoose.connect(ConfigEnv.databaseLink, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(()=>{
        console.log('Successfully connected to the database');
        return 'OK';
    })
    .catch((err)=>{
        console.log(err);
        return 'FAIL';
    });
}
function disconnect(){
    mongoose.connection.close();
}
export {Connect, disconnect}