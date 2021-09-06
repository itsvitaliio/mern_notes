import express from 'express';
import UsersController from './auth.controller.class';
import { UserPlan } from '../models/user';

class UsersRouter {
    public router = express.Router();
    private userCtrl = new UsersController();
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get('/check', this.verify);
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
        this.router.post('/authenticate', this.authenticate);
        this.router.post('/logout', this.logout);
    }

    verify = (req : express.Request, res : express.Response) => {
        res.send('Works fine');
    }

    register = (req : express.Request, res : express.Response) => {
        const query = req.body;
        this.userCtrl.addUser(query.username, query.password, res);
    }

    login = async (req : express.Request, res : express.Response) => {
        const query = req.body;
        const user = await this.userCtrl.getUser(query.username, res);
        const queryResult = await this.userCtrl.checkPassword(user, query.password, res);
        if(queryResult){
            console.log('Good password');
            this.userCtrl.createJwt(user, res);
        }else{
            console.log('Bad password');
            res.status(409);
        }
    }

    authenticate = async (req : express.Request, res : express.Response) => {
        console.log(req.cookies);
        const query = req.body;
        const token = req.cookies.token;
        const user = await this.userCtrl.getUser(query.username, res);
        this.userCtrl.verifyJwt(user, token, res);
    }

    logout = async (req : express.Request, res : express.Response) => {
        res.clearCookie("token", {path:'/'});
        res.status(200).send('Successfully deleted the cookie'); 
    }
}

export default UsersRouter;
