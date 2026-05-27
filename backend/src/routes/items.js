const express = require('express');
const router = express.Router();
const db = require('../db/database');

// traer todos los destinos activos
router.get('/', (req, res) => {
    try {
        const filas = db.prepare(
            'SELECT * FROM items WHERE activo = 1 ORDER BY fechaRegistro ASC'
        ).all();
        res.json(filas.map(fila => ({
            ...fila,
            activo: Boolean(fila.activo),
            atributos: JSON.parse(fila.atributos || '{}')
        })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// agregar un destino nuevo
router.post('/', (req, res) => {
    const { nombre, categoriaId, estado = "pendiente", atributos = {}, notas = "", puntuacion } = req.body;

    if (!nombre || nombre.trim().length < 3) {
        return res.status(400).json({ error: 'El nombre es muy corto' });
    }

    try {
        const nuevo = {
            id: crypto.randomUUID(),
            nombre: nombre.trim(),
            categoriaId,
            estado,
            puntuacion: puntuacion || null,
            fechaRegistro: new Date().toISOString(),
            fechaActividad: new Date().toISOString(),
            notas,
            atributos: JSON.stringify(atributos),
            activo: 1
        };

        db.prepare(`
            INSERT INTO items (id, nombre, categoriaId, estado, puntuacion, fechaRegistro, fechaActividad, notas, atributos, activo)
            VALUES (@id, @nombre, @categoriaId, @estado, @puntuacion, @fechaRegistro, @fechaActividad, @notas, @atributos, @activo)
        `).run(nuevo);

        res.status(201).json({ ...nuevo, activo: true, atributos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
