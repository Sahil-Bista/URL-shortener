import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  originalURL: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  clickCount: {
    type: Number,
    default: 0,
  },
});

export const URLModel = mongoose.model('URL', schema);
