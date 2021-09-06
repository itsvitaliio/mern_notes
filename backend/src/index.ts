import App from './app';
import ConfigEnv from './config/configEnv';
import UsersRouter from './controllers/auth.controller.routes';
import UpdateRouter from './controllers/update.controller.routes';

const app = new App(
    [
      new UsersRouter(),
      new UpdateRouter()
    ], ConfigEnv.port);
 
app.listen();