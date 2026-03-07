import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const TipoUsuario =sequelize.define("TipoUsuario",{
    id_tipo_usuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    descripcion:{
        type:DataTypes.TEXT,
        allowNull:true
    }
    
    },{
        tableName:"tipo_de_usuario",
        timestamps:false

});

export default TipoUsuario;