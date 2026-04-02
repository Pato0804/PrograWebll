import { DataTypes } from "sequelize";
import sequelize from "../ORM/database.js";

const User =sequelize.define("User",{
    id_user:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    full_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    birth_date:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    photo_url:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    gender:{
        type:DataTypes.ENUM("Masculino","Femenino"),
        allowNull:true
    },
    country:{
        type:DataTypes.STRING(50),
        allowNull:true
    },
    birth_place:{
        type:DataTypes.STRING(100),
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    id_user_type:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    },{
        tableName:"users",
        timestamps:false

});

export default User;