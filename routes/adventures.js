import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();
const adventurePath = path.resolve('./data/adventures.json');

const readAdventures = async () => {
    const data = await fs.readFile(adventurePath, 'utf8');
    return JSON.parse(data);
};

const masterPath = path.resolve('./data/masters.json');

const readMasters = async () => {
    const data = await fs.readFile(masterPath, 'utf8');
    return JSON.parse(data);
};

router.get('/', async (req, res) => {
    try {
        const adventures = await readAdventures();
        res.json(adventures);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load adventure details' });
    }
}); 

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const adventures = await readAdventures();
        const adventure = adventures.find(adventure => adventure.id == id);
        if (adventure) {
            res.json(adventure);
        } else {
            res.status(404).json({ error: 'Adventure not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to read adventure details' });
    }
});

router.get('/:id/masters', async (req, res) => {
    const { id } = req.params;
    try {
        const masters = await readMasters();
        const list = masters.filter(master => 
            {return master.adventures.includes(Number(id))}
        );

        if (list.length > 0) {
            res.json(list);
        } else {
            res.status(404).json({ error: 'Adventure not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to read adventure details' });
    }
});

export default router;