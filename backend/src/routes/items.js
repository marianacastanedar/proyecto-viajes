const express = require('express');
const router = express.Router();
const db = require('../db/database');

// metodo get para traer todos los activos
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

// post que agrega un destino nuevo
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

// put para actualizar un destino
router.put('/:id', (req, res) => {
    const { nombre, categoriaId, estado, puntuacion, notas, atributos } = req.body;
    try {
        const info = db.prepare(`
            UPDATE items SET nombre = @nombre, categoriaId = @categoriaId, estado = @estado,
            puntuacion = @puntuacion, notas = @notas, atributos = @atributos,
            fechaActividad = @fechaActividad
            WHERE id = @id
        `).run({
            id: req.params.id,
            nombre,
            categoriaId,
            estado,
            puntuacion: puntuacion || null,
            notas: notas || '',
            atributos: JSON.stringify(atributos || {}),
            fechaActividad: new Date().toISOString()
        });
        if (info.changes === 0) return res.status(404).json({ error: 'No encontrado' });
        res.json({ mensaje: 'Destino actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// delete: archivar un destino
router.delete('/:id', (req, res) => {
    const info = db.prepare(
        'UPDATE items SET activo = 0 WHERE id = ?'
    ).run(req.params.id);
    if (info.changes === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Destino archivado' });
});

// POST /api/items/:id/registro: post para registrar dias en un destino
router.post('/:id/registro', (req, res) => {
    const { fecha, valor, notas = '' } = req.body;
    try {
        const nuevoRegistro = {
            id: crypto.randomUUID(),
            itemId: req.params.id,
            fecha,
            valor,
            notas
        };
        db.prepare(`
            INSERT INTO registros (id, itemId, fecha, valor, notas)
            VALUES (@id, @itemId, @fecha, @valor, @notas)
        `).run(nuevoRegistro);
        res.status(201).json(nuevoRegistro);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
