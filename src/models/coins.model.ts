import mongoose, { Schema, Document } from 'mongoose';

interface ICoin extends Document {
  coin: string;
  price: number;
  marketCap: number;
  change24h: number;
  timestamp: Date;
}

const coinSchema = new Schema<ICoin>({
  coin: { type: String, required: true, enum: ['bitcoin', 'matic-network', 'ethereum'] },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Coin = mongoose.model<ICoin>('Coin', coinSchema);

export default Coin;
