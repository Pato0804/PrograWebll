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
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contrasena:{
        type:DataTypes.STRING,
        allowNull:false
    }
    },{
        tableName:"usuarios",
        timestamps:false

});

export default Usuario;