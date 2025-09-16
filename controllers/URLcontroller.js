import { nanoid } from 'nanoid';
import { URLModel } from '../models/URL.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

export const shortenURL = asyncWrapper(async (req, res) => {
  const { longURL } = req.body;
  const duplicate = await URLModel.findOne({ originalURL: longURL });
  if (duplicate) {
    return res.status(200).json({
      originalURL: longURL,
      shortenedURL: `${req.protocol}://${req.get('host')}/${duplicate.shortCode}`,
    });
  }
  const newUrl = await URLModel.create({
    originalURL: longURL,
    shortCode: nanoid(5),
  });
  return res.status(200).json({
    originalURL: longURL,
    shortenedURL: `${req.protocol}://${req.get('host')}/${newUrl.shortCode}`,
  });
});
