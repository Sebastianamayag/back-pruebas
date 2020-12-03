const express= require('express');
const app=express();
const {Estudiante}=require('../Config/sequealize');
const bcrypt = require('bcryptjs');
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
            return res.status(200).json({errores: errors.array()}) 
        }else{
            const estudiante = await Estudiante.findOne({ where: { usuario: req.body.usuario } });
            if(estudiante){
                res.status(200).json({ error: 'Ya existe un usuario llamado : ' + req.body.usuario })
            }
            else{
                req.body.contraseña = bcrypt.hashSync(req.body.contraseña, 10);
                const estudent = await Estudiante.create(req.body);
                res.status(200).json({"mensaje":"Usuario creado Correctamente",estudent});
            }
        } 
    })
//ruta pra ingreso de estudiantes
app.post('/user/login',async(req,res)=>{
    const usuario = await Estudiante.findOne({ where: { usuario: req.body.usuario } });
    if (usuario) {
        const iguales = bcrypt.compareSync(req.body.contraseña, usuario.contraseña);
        if (iguales) {
            res.status(200).json({ success: usuario.usuario  });
        } else {
            res.status(200).json({ error: 'Error en usuario y/o contraseña' })
        }
    } else {
        res.status(200).json({ error: 'Error en usuario y/o contraseña' })
    }
})

module.exports=app;