const express= require('express');
const app=express();
const {Estudiante}=require('../Config/sequealize');
const bcrypt = require('bcryptjs');
var moment = require('moment');
const jwt = require('jwt-simple');
const { check, validationResult } = require('express-validator');
//ruta para crear un estudiante o profesor
app.post('/user/create',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('contraseña', 'La contraseña es obligatorio').not().isEmpty(),
        check('tipousuario', 'El tipo de usuario es obligatorio').not().isEmpty()
    ], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){ 
            return res.status(400).json({errores: errors.array()}) 
        }else{
            const estudiante = await Estudiante.findOne({ where: { usuario: req.body.usuario } });
            if(estudiante){
                res.status(400).json({ error: 'Ya existe un usuario llamado : ' + req.body.usuario })
            }
            else{
                req.body.contraseña = bcrypt.hashSync(req.body.contraseña, 10);
                const estudent = await Estudiante.create(req.body);
                res.status(200).json({"mensaje":"Usuario creado Correctamente",estudent});
            }
        } 
    }
)
//ruta pra ingreso de estudiantes
app.post('/user/login',async(req,res)=>{
    const usuario = await Estudiante.findOne({ where: { usuario: req.body.usuario } });
    if (usuario) {
        const iguales = bcrypt.compareSync(req.body.contraseña, usuario.contraseña);
        if (iguales) {
            const token=createToken(usuario);
            res.status(200).json({ success:usuario,token });
        } else {
            res.status(400).json({ error: 'Error en usuario y/o contraseña' })
        }
    } else {
        res.status(400).json({ error: 'Error en usuario y/o contraseña' })
    }
});
//crear el token de autenticación
const createToken = (usuario) => {
    const payload = {
        usuario: usuario.usuario,
        idusuario:usuario.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(1440, 'minutes').unix()
    }

    return jwt.encode(payload, 'secret-phrase');
}

module.exports=app;