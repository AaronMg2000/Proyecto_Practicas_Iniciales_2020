"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const database_1 = __importDefault(require("../../DataBase/database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UsusarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.query('select * from usuario');
            res.json(usuarios);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var pass = "";
            bcryptjs_1.default.genSalt(10, function (err, salt) {
                return __awaiter(this, void 0, void 0, function* () {
                    bcryptjs_1.default.hash(req.body.Password, salt, function (err, hash) {
                        return __awaiter(this, void 0, void 0, function* () {
                            var NuevoUsuario = {
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
                            yield database_1.default.query('INSERT INTO usuario set ?', [NuevoUsuario]);
                            res.json({ text: 'Creando un Usuario' });
                        });
                    });
                });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield database_1.default.query('DELETE FROM usuario WHERE Carne = ?', [id]);
            console.log(req.body);
            res.json({ mensaje: 'El usuario con carne ' + [id] + ' fue eliminado con exito' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield database_1.default.query('UPDATE usuario set ? WHERE Carne = ?', [req.body, id]);
            console.log(req.body);
            res.json({ mensaje: 'El usuario con carne ' + [id] + ' fue actualizado con exito' });
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield database_1.default.query('select * from usuario where Carne = ?', [id]);
            if (usuario.length > 0) {
                return res.json(usuario[0]);
            }
            else {
                res.status(404).json({ text: 'El usuario no existe en la base de datos' });
            }
        });
    }
}
exports.usuarioController = new UsusarioController();
