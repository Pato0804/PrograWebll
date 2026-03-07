import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Reaccion =sequelize.define("Reaccion",{
    id_reaccion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    id_publicacion:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    tipo:{
        type: DataTypes.ENUM("like","dislike"),
        allowNull:false
    },
    fecha_reaccion:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
    },{
        tableName:"reacciones",
        timestamps:false

});

export default Reaccion;