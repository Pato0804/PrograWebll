import express from 'express';
import Subscription from '../ORM/subscriptionsORM.js';

const router = express.Router();

//Obtener las suscripciones de un usuario
router.get('/user/:userId', async (req, res) => {
    try {
        const subs = await Subscription.findAll({
            where: { id_user: req.params.userId }
        });
        res.json(subs);
    } catch (error) {
        console.error("Error al obtener suscripciones:", error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// crear una nueva suscripción (POST)
router.post('/', async (req, res) => {
    try {
        const { id_user, id_world_cup } = req.body;
        
        // Verificamos si ya existe para no duplicar datos
        const existing = await Subscription.findOne({
            where: { id_user, id_world_cup }
        });

        if (existing) {
            return res.status(400).json({ error: 'Ya estás suscrito a este mundial' });
        }

        const newSub = await Subscription.create({ id_user, id_world_cup });
        res.status(200).json({ message: '¡Suscripción exitosa!', sub: newSub });
    } catch (error) {
        console.error("Error al suscribirse:", error);
        res.status(500).json({ error: 'No se pudo crear la suscripción' });
    }
});

//ELIMINAR una suscripción
router.delete('/', async (req, res) => {
    try {
        const { id_user, id_world_cup } = req.body;
        
        await Subscription.destroy({
            where: { id_user, id_world_cup }
        });
        
        res.status(200).json({ message: 'Suscripción cancelada' });
    } catch (error) {
        console.error("Error al cancelar suscripción:", error);
        res.status(500).json({ error: 'No se pudo cancelar la suscripción' });
    }
});

export default router;