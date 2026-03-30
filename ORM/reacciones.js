import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Reaction =sequelize.define("Reaction",{
    id_reaction:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    id_post:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    type:{
        type: DataTypes.ENUM("like","dislike"),
        allowNull:false
    },
    created_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
    },{
        tableName:"reactions",
        timestamps:false

});

export default Reaction;