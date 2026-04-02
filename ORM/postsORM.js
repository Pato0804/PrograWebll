import { DataTypes } from "sequelize";
import sequelize from '../database.js';

const Post =sequelize.define("Post",{
    id_post:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    image_url:{
        type:DataTypes.TEXT,
        
    },
    video_url:{
        type:DataTypes.STRING,
        
    },
    created_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    approved_at:{
        type:DataTypes.DATE,
        
    },
    is_approved:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull:false
    },id_world_cup:{
        type: DataTypes.INTEGER,
        allowNull:false
    },id_category:{
        type: DataTypes.INTEGER,
        
    }
    },{
        tableName:"posts",
        timestamps:false

});

export default Post;