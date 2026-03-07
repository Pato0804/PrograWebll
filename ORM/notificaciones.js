import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Notificacion =sequelize.define("Notificacion",{
    id_notificacion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    mensaje:{
        type:DataTypes.STRING,
        allowNull:false
    },
    
    tipo:{
        type:DataTypes.ENUM("amistad","comentario","reaccion","sistema"),
        allowNull:false
    },
    leido:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    fecha_creacion:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
    },{
        tableName:"notificaciones",
        timestamps:false

});

export default Notificacion;