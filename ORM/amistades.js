import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Amistad =sequelize.define("Amistad",{
    id_amistad:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    id_solicitante:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    id_receptor:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    estado:{
        type:DataTypes.ENUM("pendiente","aceptada","rechazada"),
        defaultValue:"pendiente"
    },
    fecha_solicitud:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
    },{
        tableName:"amistades",
        timestamps:false

});

export default Amistad;