import express , {Request, Response} from 'express';
import pool from '../../DataBase/database';
import bycrypt  from 'bcryptjs';
class UsusarioController{
    

    public list (req: Request, res: Response){
        res.json({text: 'listando Usuairos'})
    }
    public async create (req: Request, res: Response){
        var pass="";
        bycrypt.genSalt(10, async function(err,salt){
            bycrypt.hash(req.body.Password,salt, async function(err,hash){
                var NuevoUsuario={
                    Carne: req.body.Carne,
                    Nombres: req.body.Nombres,
                    Apellido: req.body.Apellido,
                    Password: hash,
                    Correo: req.body.Correo
                };
                // pass =hash;
                // console.log(pass);
                // bycrypt.compare(req.body.Password,pass,function(err,result){
                //     console.log(result);
                // });
                await pool.query('INSERT INTO usuario set ?',[NuevoUsuario]);
                res.json({text: 'Creando un Usuario'})
            });
        });
    }
    public delete(req:Request, res:Response){
        res.json({text: 'eliminando un usuario:' + req.params.id})
    }
    public update(req:Request, res:Response){
        res.json({text: 'actualizando el Usuario:'+ req.params.id});
    }
    public get(req:Request, res:Response){
        res.json({text: 'selecciono al usuario: '+req.params.id})
    }
}

export const usuarioController = new UsusarioController();
