import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const WorldCup =sequelize.define("WorldCup",{
    id_world_cup:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    date:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    host:{
        type:DataTypes.STRING,
        
    },
    image_url:{
        type:DataTypes.TEXT
    },
    description:{
        type:DataTypes.TEXT
    }
    },{
        tableName:"world_cups",
        timestamps:false

});

export default WorldCup;