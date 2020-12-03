module.exports=(sequelize,type)=>{
    const Estudiantes=sequelize.define('Estudiantes',{
        id:{
            type:type.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type:type.STRING,
            allownull:false
        },
        contraseña:{
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
    return Estudiantes;
}