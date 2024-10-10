import express from 'express';
import cors from 'cors';
import { getCoinStats, getCoinDeviation } from './controllers/coin.controller';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/v1/stats', getCoinStats);

app.get('/api/v1/deviation', getCoinDeviation);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend!' });
});

export default app;
