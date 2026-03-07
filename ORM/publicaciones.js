import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Publicacion =sequelize.define("Publicacion",{
    id_notificacion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    
    titulo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mensaje:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    imagen_url:{
        type:DataTypes.TEXT,
        
    },
    video_url:{
        type:DataTypes.STRING,
        
    },
    fecha_creacion:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    fecha_aprobacion:{
        type:DataTypes.DATE,
        
    },
    estatus_aprobacion:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull:false
    },id_mundial:{
        type: DataTypes.INTEGER,
        allowNull:false
    },id_categoria:{
        type: DataTypes.INTEGER,
        
    }
    },{
        tableName:"publicaciones",
        timestamps:false

});

export default Publicacion;