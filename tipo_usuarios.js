import express from 'express';
import TipoUsuario from './ORM/tipo_usuario.js';

const router =express.Router();

router.get('/',async(req, res) => {
    const tipo_de_usuario= await TipoUsuario.findAll();
    res.json(tipo_de_usuario);
});

router.get('/:id',async(req, res) => {
    const tipo_de_usuario= await TipoUsuario.findByPk(req.params.id);
    res.json(tipo_de_usuario);
});

router.post('/',async(req, res) => {
    const {nombre_completo,descripcion}=req.body;
    const nuevoTipoUsuario=await TipoUsuario.create({
        nombre_completo,
        descripcion
    });
    res.send(`Tipo de Usuario creado exitosamente xd`);
});


router.patch('/:id',async(req, res) => {
    const tipo_de_usuario=await TipoUsuario.findByPk(req.params.id);
    await tipo_de_usuario.update(req.body);

    
    res.send(`Actualizaciones señores, 
        actualizaciones`);
});

router.delete('/:id',async(req, res) => {
    const tipo_de_usuario=await TipoUsuario.findByPk(req.params.id);
 

    await tipo_de_usuario.destroy();
    res.send(`No me siento bien señor stark`);
});

export default router;
