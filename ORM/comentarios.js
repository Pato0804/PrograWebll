import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Comentario =sequelize.define("Comentario",{
    id_comentario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    texto:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    fecha_creacion:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    id_usuario:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_publicacion:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    pais:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
    },{
        tableName:"comentarios",
        timestamps:false

});

export default Comentario;