import { DataTypes } from "sequelize";
import sequelize from "../ORM/database.js";

const UserType =sequelize.define("UserType",{
    id_user_type:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:true
    }
    
    },{
        tableName:"user_types",
        timestamps:false

});

export default UserType;