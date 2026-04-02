import { DataTypes } from "sequelize";
import sequelize from "../ORM/database.js";

const Friendship =sequelize.define("Friendship",{
    id_friendship:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    requester_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    receiver_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM("pendiente","aceptada","rechazada"),
        defaultValue:"pendiente"
    },
    request_date:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
    },{
        tableName:"friendships",
        timestamps:false

});

export default Friendship;