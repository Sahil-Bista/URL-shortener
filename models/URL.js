import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  clickedAt: {
    type: Date,
    default: Date.now(),
  },
  user_agent: {
    type: String,
  },
  browser: {
    type: String,
  },
  os: {
    type: String,
  },
  deviceModel: {
    type: String,
  },
});

const URLSchema = new mongoose.Schema({
  originalURL: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  analytics: [analyticsSchema],
});

export const URLModel = mongoose.model('URL', URLSchema);
