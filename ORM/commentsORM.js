import { DataTypes } from "sequelize";
import sequelize from '../database.js';

const Comment =sequelize.define("Comment",{
    id_comment:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    created_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    id_user:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_post:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    },{
        tableName:"comments",
        timestamps:false

});

export default Comment;