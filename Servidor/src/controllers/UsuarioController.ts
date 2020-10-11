import express , {Request, Response} from 'express';
import pool from '../../DataBase/database';
import bycrypt  from 'bcryptjs';
class UsusarioController{
    

    public async list (req: Request, res: Response){
       const usuarios = await pool.query('select * from usuario');
       res.json(usuarios);
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

    public async delete(req:Request, res:Response){
        const {id} = req.params;
        const usuario = await pool.query('DELETE FROM usuario WHERE Carne = ?',[id]);
        console.log(req.body);
        res.json({mensaje: 'El usuario con carne '+[id]+' fue eliminado con exito'});
    }

    public async update(req:Request, res:Response){
        const {id} = req.params;
        const usuario = await pool.query('UPDATE usuario set ? WHERE Carne = ?',[req.body,id]);
        console.log(req.body    );
        res.json({mensaje: 'El usuario con carne '+[id]+' fue actualizado con exito'});
    }

    public async get(req:Request, res:Response){
        const {id} = req.params;
        const usuario = await pool.query('select * from usuario where Carne = ?',[id]);
        
        if(usuario.length > 0)
        {
            return res.json(usuario[0]);
        }
        else
        {
            res.status(404).json({text: 'El usuario no existe en la base de datos'});
        }
    }
}

export const usuarioController = new UsusarioController();
