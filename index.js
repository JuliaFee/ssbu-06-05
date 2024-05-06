const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 9876;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ssbu',
  password: 'ds564',
  port: 9876,
});

app.use(express.json());

// rota POST Fighters

app.post('/fighters', async (req, res) => {
    try {
        const { f_name, hp, atk, spd, game } = req.body;

        await pool.query('INSERT INTO fighters (f_name, hp, atk, spd, game) VALUES ($1, $2, $3, $4, $5)', 
        [f_name, hp, atk, spd, game]);

        res.status(200).send({ mensagem: 'Lutador registrado com sucesso' });
        
    } catch (error) {
        console.error('Erro ao registrar lutador:', error);
        res.status(500).send({ mensagem: 'Erro interno ao registrar lutador' });
    }
});