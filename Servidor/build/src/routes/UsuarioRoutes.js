"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioController_1 = require("../controllers/UsuarioController");
class UsuarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', UsuarioController_1.usuarioController.list);
        this.router.post('/', UsuarioController_1.usuarioController.create);
        this.router.delete('/:id', UsuarioController_1.usuarioController.delete);
        this.router.put('/:id', UsuarioController_1.usuarioController.update);
        this.router.get('/:id', UsuarioController_1.usuarioController.get);
    }
}
const userRoutes = new UsuarioRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=UsuarioRoutes.js.map