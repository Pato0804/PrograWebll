

import { Sequelize } from "sequelize";

const sequelize=new Sequelize("webprog2","root","",{
    host:"localhost",
    dialect:"mysql",
    port:3306
});

export default sequelize;