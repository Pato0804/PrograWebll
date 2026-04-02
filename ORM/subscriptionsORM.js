import { DataTypes } from "sequelize";
import sequelize from '../database.js';

const Subscription =sequelize.define("Subscription",{
    id_subscription:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    id_world_cup:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    subscription_date:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
    },{
        tableName:"subscriptions",
        timestamps:false

});

export default Subscription;