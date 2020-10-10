import express, {Application} from 'express';

class Server{
    public app: Application;
    constructor(){
        this.app = express();
    }
    config(): void{
        this.app.set('port', process.env.PORT || 3000)
    }

    Route(): void{

    }

    start(): void{
        this.app.listen()
    }
}

new Server();