import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Suscripcion =sequelize.define("Suscripcion",{
    id_suscripcion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    id_mundial:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    fecha_suscripcion:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
    },{
        tableName:"suscripciones_mundiales",
        timestamps:false

});

export default Suscripcion;