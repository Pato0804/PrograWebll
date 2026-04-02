import express from 'express';
import Category from '../ORM/categoriesORM.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const categories= await Category.findAll();
    res.json(categories);
});

router.get('/:id',async(req, res) => {
    const categories= await Category.findByPk(req.params.id);
    res.json(categories);
});

router.post('/',async(req, res) => {
    const {name,description}=req.body;
    const newCategory=await Category.create({
        name,
        description
    });
    res.send(`Category created successfully xd`);
});


router.patch('/:id',async(req, res) => {
    const categories=await Category.findByPk(req.params.id);
    await categories.update(req.body);

    
    res.send(`Upgrades people, 
        upgrades`);
});

router.delete('/:id',async(req, res) => {
    const categories=await Category.findByPk(req.params.id);
 

    await categories.destroy();
    res.send(`Im not fellin good mr stark`);
});

export default router;
