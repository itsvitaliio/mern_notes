import express from 'express';
import UsersUpdater from './update.controller.class';

class UpdateRouter {
    public router = express.Router();
    private userUpd = new UsersUpdater();
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post('/updatePosts', this.updatePosts);
        this.router.post('/getPosts', this.getPosts);
        this.router.post('/changeUsername', this.changeUsername);
        this.router.post('/changePassword', this.changePassword);
        this.router.post('/deleteUser', this.deleteUser);
    }

    updatePosts = (req : express.Request, res : express.Response) => {
        const query = req.body;
        this.userUpd.updatePosts(query.username, query.posts, res);
    }

    getPosts = (req : express.Request, res : express.Response) => {
        const query = req.body;
        console.log('sent posts to user');
        this.userUpd.getPosts(query.username, res);
    }

    changeUsername = (req : express.Request, res : express.Response) => {
        const query = req.body;
        this.userUpd.changeUsername(query.username, query.password, query.newUsername, res);
    }

    changePassword = (req : express.Request, res : express.Response) => {
        const query = req.body;
        this.userUpd.changePassword(query.username, query.password,  query.newPassword, res);
    }

    deleteUser = (req : express.Request, res : express.Response) => {
        const query = req.body;
        this.userUpd.deleteUser(query.username, query.password, res);
    }
}

export default UpdateRouter;
