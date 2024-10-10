import { Request, Response } from 'express';
import Coin from '../models/coins.model';
import asyncHandler from '../utils/asyncHandler';

export const getCoinStats = asyncHandler(async (req: Request, res: Response) => {
  const { coin } = req.query;
  console.log(coin);
  if (!coin || typeof coin !== 'string') {
    return res.status(400).json({ error: 'Invalid coin parameter' });
  }

  const validCoins = ['bitcoin', 'ethereum', 'matic-network'];
  if (!validCoins.includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin. Must be one of: bitcoin, ethereum, matic-network' });
  }

  const latestCoinData = await Coin.findOne({ coin }).sort({ timestamp: -1 });

  if (!latestCoinData) {
    return res.status(404).json({ error: 'No data found for the specified coin' });
  }

  res.json({
    price: latestCoinData.price,
    marketCap: latestCoinData.marketCap,
    "24hChange": latestCoinData.change24h
  });
});

export const getCoinDeviation = asyncHandler(async (req: Request, res: Response) => {
  const { coin } = req.query;

  if (!coin || typeof coin !== 'string') {
    return res.status(400).json({ error: 'Invalid coin parameter' });
  }

  const validCoins = ['bitcoin', 'matic-network', 'ethereum'];
  if (!validCoins.includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin. Must be bitcoin, matic-network, or ethereum' });
  }

  const lastHundredRecords = await Coin.find({ coin })
    .sort({ timestamp: -1 })
    .limit(100)
    .select('price');

  if (lastHundredRecords.length === 0) {
    return res.status(404).json({ error: 'No records found for the specified coin' });
  }

  const prices = lastHundredRecords.map(record => record.price);
  const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const squaredDifferences = prices.map(price => Math.pow(price - mean, 2));
  const variance = squaredDifferences.reduce((sum, diff) => sum + diff, 0) / prices.length;
  const standardDeviation = Math.sqrt(variance);

  res.json({ deviation: Number(standardDeviation.toFixed(2)) });
});