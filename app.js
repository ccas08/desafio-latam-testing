const express = require('express');
const app = express();

app.use(express.json());

let cafes = [
    { id: 1, nombre: 'Americano' },
    { id: 2, nombre: 'Espresso' },
];

app.get('/cafes', (req, res) => {
    res.status(200).json(cafes);
});

app.delete('/cafes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cafeIndex = cafes.findIndex(c => c.id === id);
    if (cafeIndex === -1) {
        return res.status(404).send('Café no encontrado');
    }
    cafes.splice(cafeIndex, 1);
    res.status(204).send();
});

app.post('/cafes', (req, res) => {
    const nuevoCafe = req.body;
    cafes.push(nuevoCafe);
    res.status(201).json(nuevoCafe);
});

app.put('/cafes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { id: bodyId } = req.body;
    if (id !== bodyId) {
        return res.status(400).send('IDs no coinciden');
    }
    res.status(200).send('Café actualizado');
});

module.exports = app;
