import express from 'express';
import WorldCup from './ORM/mundiales.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const world_cups= await WorldCup.findAll();
    res.json(world_cups);
});

router.get('/:id',async(req, res) => {
    const world_cups= await WorldCup.findByPk(req.params.id);
    res.json(world_cups);
});

router.post('/',async(req, res) => {
    const {name,date,host,image_url,description}=req.body;
    const newWorldCup=await WorldCup.create({
        name,date,host,image_url,description
    });
    res.send(`WorldCup created successfully xd`);
});


router.patch('/:id',async(req, res) => {
    const world_cups=await WorldCup.findByPk(req.params.id);
    await world_cups.update(req.body);

    
    res.send(`Upgrades people, 
        upgrades`);
});

router.delete('/:id',async(req, res) => {
    const world_cups=await WorldCup.findByPk(req.params.id);
 

    await world_cups.destroy();
    res.send(`Im not fellin good mr stark`);
});

export default router;
