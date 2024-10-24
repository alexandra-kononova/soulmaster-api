import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();
const masterPath = path.resolve('./data/masters.json');

const readMasters = async () => {
    const data = await fs.readFile(masterPath, 'utf8');
    return JSON.parse(data);
};

router.get('/', async (req, res) => {
    try {
        const masters = await readMasters();
        res.json(masters);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load master details' });
    }
}); 

export default router;