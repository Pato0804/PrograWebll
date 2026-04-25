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
    
 //(esta parte seguia en español XD)
    type: {
        type: DataTypes.ENUM("friend", "comment", "reaction", "system"),
        allowNull: false
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false 
    },
//sigo sin saber por que esto no jalaba
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    }
}, {
    tableName: "notifications",
    timestamps: false
});

export default Notification;