import express from 'express';
import { Op } from 'sequelize';
import Mundial from '../ORM/mundiales.js';

const router = express.Router();

router.get('/buscar/:anio', async (req, res) => {
    try {
        const anio = req.params.anio;
        const mundial = await Mundial.findOne({
            where: {
                fecha: {
                    [Op.between]: [`${anio}-01-01`, `${anio}-12-31`]
                }
            }
        });
        
        if (mundial) {
            res.json(mundial);
        } else {
            res.status(404).json({ error: 'Mundial no encontrado' });
        }
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).json({ error: 'Error al conectar con la BD' });
    }
});

export default router;