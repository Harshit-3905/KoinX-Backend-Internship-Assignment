import { connectToDatabase } from './db/db';
import app from './app';
import { startCryptoDataJob } from './jobs/fetchCryptoData';
import { PORT } from './config/env';

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    startCryptoDataJob();
    console.log('Server started successfully');
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();





