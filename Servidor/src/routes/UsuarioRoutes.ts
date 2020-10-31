import {Router} from 'express';
import {usuarioController} from '../controllers/UsuarioController';


class UsuarioRoutes{
    public router : Router = Router();
    
    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/',usuarioController.list);
        this.router.post('/',usuarioController.create);
        this.router.delete('/:id',usuarioController.delete);
        this.router.put('/:id',usuarioController.update);
        this.router.get('/:id',usuarioController.get)
        this.router.post('/Login',usuarioController.login)
        
    }
}
const userRoutes = new UsuarioRoutes();
export  default userRoutes.router;