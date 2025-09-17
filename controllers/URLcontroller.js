import { nanoid } from 'nanoid';
import { URLModel } from '../models/URL.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

export const shortenURL = asyncWrapper(async (req, res) => {
  const { longURL } = req.body;
  const duplicate = await URLModel.findOne({ originalURL: longURL });
  if (duplicate) {
    return res.status(200).json({
      originalURL: longURL,
      shortenedURL: `${req.protocol}://${req.get('host')}/api/url/${duplicate.shortCode}`,
    });
  }
  const newUrl = await URLModel.create({
    originalURL: longURL,
    shortCode: nanoid(5),
  });
  return res.status(200).json({
    originalURL: longURL,
    shortenedURL: `${req.protocol}://${req.get('host')}/api/url/${newUrl.shortCode}`,
  });
});

export const redirectURL = asyncWrapper(async (req, res) => {
  const { shortCode } = req.params;
  const url = await URLModel.findOne({ shortCode });
  if (!url) {
    const error = new Error(
      'No url found for the shortcode, please try shortcoding the URL first'
    );
    error.statusCode = 404;
    throw error;
  }
  url.clickCount += 1;
  await url.save();
  res.redirect(url.originalURL);
});
