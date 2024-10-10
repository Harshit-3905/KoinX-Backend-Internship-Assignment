import cron from 'node-cron';
import Coin from '../models/coins.model';
import axiosInstance from '../utils/AxiosInstance';

const COINS = ['bitcoin', 'ethereum', 'matic-network'];

async function fetchCryptoData() {
  try {
    const responses = await Promise.all(
      COINS.map(coin => axiosInstance.get(coin))
    );

    const coinData = responses.map(response => ({
      coin: response.data.id,
      price: response.data.market_data.current_price.usd,
      marketCap: response.data.market_data.market_cap.usd,
      change24h: response.data.market_data.price_change_24h_in_currency.usd,
    }));

    await Coin.insertMany(coinData);

    console.log('Cryptocurrency data updated successfully');
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
  }
}

export function startCryptoDataJob() {
  cron.schedule('0 */2 * * *', async () => {
    console.log('Running cryptocurrency data fetch job');
    await fetchCryptoData();
  });

  fetchCryptoData();
}