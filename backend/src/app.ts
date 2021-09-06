import express from 'express';
import { json } from "body-parser";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Connect, disconnect } from './config/db_connect';
 
class App {
  public app: express.Application;
  public port: number;
  private server:any;
 
  constructor(controllers : any, port:number) {
    this.app = express();
    this.port = port;
    Connect();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddleware() {
    this.app.use(json());
    // options for cors middleware
    const options: cors.CorsOptions = {
      origin:["http://localhost:3000"],
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token'
      ],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
    };
    // add cors middleware to our app
    this.app.use(cors(options));
    this.app.use(cookieParser());
  }
 
  private initializeControllers(controllers : any) {
    controllers.forEach((controller : any) => {
      this.app.use('/', controller.router);
    });
  }
 
  public listen() {
    this.server = this.app.listen(this.port);
    console.log('App is listening on port ' + this.port);
  }

  public stop(){
    this.server.close();
  }
  public getApp(){

    return this.app;
  }
}
 
export default App;