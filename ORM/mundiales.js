import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Mundial =sequelize.define("Mundial",{
    id_mundial:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fecha:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    sede:{
        type:DataTypes.STRING,
        
    },
    imagen_url:{
        type:DataTypes.TEXT
    },
    descripcion:{
        type:DataTypes.TEXT
    }
    },{
        tableName:"mundiales",
        timestamps:false

});

export default Mundial;