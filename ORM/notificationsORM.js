import { DataTypes } from "sequelize";
import sequelize from '../database.js';

const Notification =sequelize.define("Notification",{
    id_notification:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false
    },
    
    type:{
        type:DataTypes.ENUM("amistad","comentario","reaccion","sistema"),
        allowNull:false
    },
    is_read:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    created_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
    },{
        tableName:"notifications",
        timestamps:false

});

export default Notification;