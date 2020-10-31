import expres, {Application} from 'express';
import IndexRoutes from './routes/IndexRoutes';
import UsuarioRoutes from './routes/UsuarioRoutes';
import morgan from 'morgan';
const session =  require ('express-session');
import cors from 'cors';
class Server{
    public app: Application;
    constructor(){
        this.app = expres();
        this.config();
        this.routes();

    }
    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(expres.json());
        this.app.use(expres.urlencoded({extended:false}));
    }
    routes(): void{
        this.app.use(IndexRoutes);
        this.app.use('/Usuarios',UsuarioRoutes);
    }
    start(): void{
        this.app.listen(this.app.get('port'),()=>{
            console.log("Servidor en el puerto: ", this.app.get('port'))
        });
    }
}
//variables globales

//public

//iniciar servidor
const servidor = new Server();
servidor.start();