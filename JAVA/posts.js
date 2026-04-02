import express from 'express';
import Post from '../ORM/postsORM.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const posts= await Post.findAll();
    res.json(posts);
});

router.get('/:id',async(req, res) => {
    const posts= await Post.findByPk(req.params.id);
    res.json(posts);
});

router.post('/',async(req, res) => {
    const {title,content,image_url,video_url,created_at,
        approved_at,is_approved,
        id_user,id_world_cup,id_category}=req.body;
    const newPost=await Post.create({
        title,content,image_url,video_url,created_at,
        approved_at,is_approved,
        id_user,id_world_cup,id_category
    });
    res.send(`Post  created successfully xd`);
});


router.patch('/:id',async(req, res) => {
    const posts=await Post.findByPk(req.params.id);
    await posts.update(req.body);

    
    res.send(`Upgrades people, 
        upgrades`);
});

router.delete('/:id',async(req, res) => {
    const posts=await Post.findByPk(req.params.id);
 

    await posts.destroy();
    res.send(`Im not fellin good mr stark`);
});

export default router;
