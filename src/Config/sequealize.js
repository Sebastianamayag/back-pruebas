const Sequelize=require('sequelize');
//import de los modelos
const EstudianteModel=require('../Models/estudiantes');
const CommentsModel=require('../Models/comentarios');
//configuracion de la url de la bd
const DBURL ='mysql://root:@localhost:3306/colegio';
//pasar los parametros de configuracion a sequelize
const sequelize=new Sequelize(DBURL);
//creando la tablas tablas
const Estudiante=EstudianteModel(sequelize,Sequelize);
const Comment=CommentsModel(sequelize,Sequelize);
//sincronizando squelize
sequelize.sync()
    .then(()=>{
        console.log('Tablas creadas');
    })

module.exports={
    Estudiante,
    Comment
}