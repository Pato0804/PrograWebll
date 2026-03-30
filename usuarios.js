import express from 'express';
import User from './ORM/usuarios.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const users= await User.findAll();
    res.json(users);
});

router.get('/:id',async(req, res) => {
    const users= await User.findByPk(req.params.id);
    res.json(users);
});

router.post('/',async(req, res) => {
    const {full_name,birth_date,photo_url,gender,country,birth_place,email,password,id_user_type}=req.body;
    const newUser=await User.create({
        full_name,birth_date,photo_url,gender,country,birth_place,email,password,id_user_type
    });
    res.send(`UserType created successfully xd`);
});


router.patch('/:id',async(req, res) => {
    const users=await User.findByPk(req.params.id);
    await users.update(req.body);

    
    res.send(`Upgrades people, 
        upgrades`);
});

router.delete('/:id',async(req, res) => {
    const users=await User.findByPk(req.params.id);
 

    await users.destroy();
    res.send(`Im not fellin good mr stark`);
});

export default router;
