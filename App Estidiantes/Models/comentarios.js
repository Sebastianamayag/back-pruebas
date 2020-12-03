module.exports=(sequelize,type)=>{
    const Comments=sequelize.define('Comments',{
        id:{
            type:type.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        cuerpocomentario:{
            type:type.STRING,
            allownull:false
        },
        usuario:{
            type:type.STRING,
            allownull:false,
            unique: {
                msg: 'El usuario necesita ser unico'
            },
        },
        tipousuario:{
            type:type.STRING,
            allownull:false,
        }
    },{
        timestamps:true
    })
    return Comments;
}