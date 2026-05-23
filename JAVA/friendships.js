import express from 'express';
import Friendship from '../ORM/friendshipsORM.js';
import User from '../ORM/usersORM.js';

const router = express.Router();

// Establece la relación entre Friendship y User para obtener los detalles del solicitante
Friendship.belongsTo(User, { foreignKey: 'requester_id', as: 'Requester' });

router.get('/', async(req, res) => {
    const friendships = await Friendship.findAll();
    res.json(friendships);
});

//obtiene las solicitudes de amistad pendientes que ha RECIBIDO un usuario específico
router.get('/received/:userId', async (req, res) => {
    try {
        const requests = await Friendship.findAll({
            where: {
                receiver_id: req.params.userId,
                status: 'pending' // 'pending' es el valor por defecto de tu ENUM de MySQL
            },
            include: [{ model: User, as: 'Requester', attributes: ['full_name', 'photo_url'] }]
        });
        res.json(requests);
    } catch (error) {
        console.error("Error al obtener solicitudes pendientes:", error);
        res.status(500).json({ error: 'Error al cargar las solicitudes' });
    }
});

//cambia el estado de la solicitud a aceptada (accepted) cuando el receptor acepte la solicitud
router.patch('/:id/accept', async (req, res) => {
    try {
        const friendship = await Friendship.findByPk(req.params.id);
        if (!friendship) return res.status(404).json({ error: 'La solicitud de amistad ya no existe.' });

        // Actualizamos al enum en inglés 'accepted' tal como está estructurado en tu base de datos SQL
        await friendship.update({ status: 'accepted' });
        res.json({ message: '¡Solicitud aceptada! Ahora son amigos mundialistas.' });
    } catch (error) {
        console.error("Error al aceptar amistad:", error);
        res.status(500).json({ error: 'No se pudo procesar la amistad' });
    }
});

router.get('/:id', async(req, res) => {
    const friendships = await Friendship.findByPk(req.params.id);
    res.json(friendships);
});

router.post('/', async(req, res) => {
    try {
        const { requester_id, receiver_id, status, request_date } = req.body;
        const newFriendship = await Friendship.create({
            requester_id,
            receiver_id,
            status: status || 'pending',
            request_date
        });
        res.json(newFriendship);
    } catch (error) {
        res.status(500).send("Error al crear registro");
    }
});

router.patch('/:id', async(req, res) => {
    const friendships = await Friendship.findByPk(req.params.id);
    await friendships.update(req.body);
    res.send(`Actualizado correctamente`);
});

router.delete('/:id', async(req, res) => {
    try {
        const friendships = await Friendship.findByPk(req.params.id);
        if (!friendships) return res.status(404).send('No encontrado');
        await friendships.destroy();
        res.send(`Solicitud procesada/eliminada`);
    } catch (error) {
        res.status(500).send("Error");
    }
});

export default router;