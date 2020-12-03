const express= require('express');
const app=express();
const {Comment}=require('../Config/sequealize');
const { check, validationResult } = require('express-validator');
//ruta para crear un estudiante o profesor
app.post('/comment/create/coment',
    [
        check('cuerpocomentario', 'El cuerpo del comentario es obligatorio').not().isEmpty(),
        check('usuario', 'El id es obligatorio').not().isEmpty(),
    ], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){ 
            return res.status(200).json({errores: errors.array()}) 
        }else{
            const comment = await Comment.create(req.body);
            if(comment){
                res.status(200).json({comment});
            }
            else{
                res.status(200).json({"mensaje":"No se ha podido crear el comentario"});
            }
        } 
    }
)

app.get('/comment',async(req,res)=>{
    const comentarios=await Comment.findAll();
    if(comentarios){
        res.status(200).json({ comentarios })
    }else{
        res.status(200).json({ error:'No hay ningun comentario  creado' })
    }
})

module.exports=app;