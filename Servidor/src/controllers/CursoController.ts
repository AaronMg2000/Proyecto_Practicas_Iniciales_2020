import express , {Request, Response} from 'express';
import pool from '../../DataBase/database';
const jwt = require('jsonwebtoken');
class CodigoCurso{
    

    public async list (req: Request, res: Response){
       const auxiliar = await pool.query('select * from curso');
       res.json(auxiliar);
    }

    public async get(req:Request, res:Response){
        const {id} = req.params;
        const auxiliar = await pool.query('select * from curso where CodigoCurso = ?',[id]);
        
        if(auxiliar.length > 0)
        {
            return res.json(auxiliar[0]);
        }
        else
        {
            res.status(404).json({text: 'El Curso no existe en la base de datos'});
        }
    }

    public async listSelect(req:Request, res:Response){
        const {id} = req.params;
        const Cursos = await pool.query('select CodigoCurso, Nombre from cursosaprobados t1 INNER JOIN pensum t2 ON t1.CarnetU = ? and t1.CursoP != t2.IdCursoPensum INNER JOIN curso t3 ON t2.Curso_CodigoCurso = t3.CodigoCurso',[id]);
        res.json(Cursos);
    }

}

export const codigoCurso = new CodigoCurso();
