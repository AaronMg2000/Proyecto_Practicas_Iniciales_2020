"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PublicacionController_1 = require("../controllers/PublicacionController");
const jwt = require('jsonwebtoken');
class PensumRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', verifyToken, PublicacionController_1.publicacionController.list);
        this.router.get('/:id', verifyToken, PublicacionController_1.publicacionController.get);
        this.router.post('/', verifyToken, PublicacionController_1.publicacionController.create);
        this.router.delete('/:id', verifyToken, verifyToken, PublicacionController_1.publicacionController.delete);
        this.router.put('/:id', verifyToken, PublicacionController_1.publicacionController.update);
    }
}
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('No tiene autorización para ingresar');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token == 'null') {
        return res.status(401).send('No tiene autorización para ingresar');
    }
    const secret = Buffer.from('secretkey', 'base64');
    const payload = jwt.verify(token, secret);
    req.userId = payload._id;
    next();
}
const pensumRoutes = new PensumRoutes();
exports.default = pensumRoutes.router;
//# sourceMappingURL=PublicacionRoutes.js.map