import express from 'express';
import User from '../ORM/usersORM.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile_photos'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

router.get('/', async(req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.get('/:id', async(req, res) => {
    const users = await User.findByPk(req.params.id);
    res.json(users);
});

router.post('/', upload.single('photo'), async (req, res) => {
    try {
        const { full_name, birth_date, gender, country, birth_place, email, password, id_user_type } = req.body;
        
        // Guardamos la dirección web de la imagen
        const photo_url = req.file ? `http://localhost:3000/uploads/profile_photos/${req.file.filename}` : null;

        const newUser = await User.create({
            full_name, birth_date, photo_url, gender, country, birth_place, email, password, id_user_type
        });
        res.send(`Usuario creado exitosamente`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al registrar usuario");
    }
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

router.patch('/:id', upload.single('photo'), async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).send('Usuario no encontrado');

        const updateData = { ...req.body };
        if (req.file) {
            updateData.photo_url = `http://localhost:3000/uploads/profile_photos/${req.file.filename}`;
        }

        await user.update(updateData);
        res.send('Perfil actualizado correctamente');
    } catch (error) {
        console.error("ERROR AL ACTUALIZAR:", error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;