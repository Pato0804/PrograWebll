import { DataTypes } from "sequelize";
import sequelize from "..ORM//database.js";

const Category =sequelize.define("Category",{
    id_category:{
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
        tableName:"categories",
        timestamps:false

});

export default Category;