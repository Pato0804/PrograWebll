import express from 'express';
import User from '../ORM/usersORM.js';

const router = express.Router();

router.get('/', async(req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.get('/:id', async(req, res) => {
    const users = await User.findByPk(req.params.id);
    res.json(users);
});

router.post('/', async(req, res) => {
    const {full_name,birth_date,photo_url,gender,country,birth_place,email,password,id_user_type}=req.body;
    const newUser = await User.create({
        full_name,birth_date,photo_url,gender,country,birth_place,email,password,id_user_type
    });
    res.send(`User created successfully`);
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado. ¿Ya te registraste?' });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Contraseña incorrecta.' });
        }

        res.json({
            message: '¡Login exitoso!',
            user: {
                id: user.id_user,
                name: user.full_name,
                email: user.email,
                type: user.id_user_type
            }
        });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

router.patch('/:id', async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        await user.update(req.body);
        res.send('Upgrades people, upgrades');

    } catch (error) {
        console.error("ERROR EN EL BACKEND AL ACTUALIZAR:", error.message);
        res.status(500).json({ 
            error: 'Error interno del servidor', 
            detalle: error.message 
        });
    }
});

router.delete('/:id', async(req, res) => {
    const users = await User.findByPk(req.params.id);
    await users.destroy();
    res.send(`Im not fellin good mr stark`);
});

export default router;