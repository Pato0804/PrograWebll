import express from 'express';
import UserType from '../ORM/userTypesORM.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const user_types= await UserType.findAll();
    res.json(user_types);
});

router.get('/:id',async(req, res) => {
    const user_types= await UserType.findByPk(req.params.id);
    res.json(user_types);
});

router.post('/',async(req, res) => {
    const {name,description}=req.body;
    const newUserType=await UserType.create({
        name,description
    });
    res.send(`UserType created successfully xd`);
});


router.patch('/:id',async(req, res) => {
    const user_types=await UserType.findByPk(req.params.id);
    await user_types.update(req.body);

    
    res.send(`Upgrades people, 
        upgrades`);
});

router.delete('/:id',async(req, res) => {
    const user_types=await UserType.findByPk(req.params.id);
 

    await user_types.destroy();
    res.send(`Im not fellin good mr stark`);
});

export default router;
