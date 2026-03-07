

import { Sequelize } from "sequelize";

const sequelize=new Sequelize("prograweb2","root","",{
    host:"localhost",
    dialect:"mysql",
    port:3307
});

export default sequelize;