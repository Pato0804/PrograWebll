import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Usuario =sequelize.define("Usuario",{
    id_usuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nombre_completo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fecha_nacimiento:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    foto_url:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    genero:{
        type:DataTypes.ENUM("Masculino","Femenino"),
        allowNull:true
    },
    pais:{
        type:DataTypes.STRING(50),
        allowNull:true
    },
    lugar_nacimiento:{
        type:DataTypes.STRING(100),
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contrasena:{
        type:DataTypes.STRING,
        allowNull:false
    },
    id_tipo_usuario:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    },{
        tableName:"usuarios",
        timestamps:false

});

export default Usuario;