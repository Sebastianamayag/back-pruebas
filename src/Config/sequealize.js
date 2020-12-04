const Sequelize=require('sequelize');
//import de los modelos
const EstudianteModel=require('../Models/estudiantes');
//pasar los parametros de configuracion a sequelize
const sequelize = new Sequelize('A6Ph1XLzs4', 'A6Ph1XLzs4', 'sKhEygjwb8', {
    host: 'remotemysql.com',
    dialect: 'mysql'
});
//creando la tablas tablas
const Estudiante=EstudianteModel(sequelize,Sequelize);
//sincronizando squelize
sequelize.sync()
    .then(()=>{
        console.log('Tablas creadas');
    })

module.exports={
    Estudiante
}