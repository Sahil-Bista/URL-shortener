import { nanoid } from 'nanoid';
import { URLModel } from '../models/URL.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { UAParser } from 'ua-parser-js';
import { logger } from '../logger/index.js';

export const shortenURL = asyncWrapper(async (req, res) => {
  const userId = req.user;
  const { longURL } = req.body;
  const duplicate = await URLModel.findOne({ originalURL: longURL });
  if (duplicate) {
    logger.info(`The long URL ${longURL} was already shortened earlier`);
    return res.status(200).json({
      originalURL: longURL,
      shortenedURL: `${req.protocol}://${req.get('host')}/api/url/${duplicate.shortCode}`,
    });
  }
  logger.info('Attempting to shorten the URL');
  const newUrl = await URLModel.create({
    originalURL: longURL,
    shortCode: nanoid(5),
    owner: userId,
  });
  logger.info(
    `Long URL ${longURL} shortened into shortCode ${newUrl.shortCode}`
  );
  return res.status(200).json({
    originalURL: longURL,
    shortenedURL: `${req.protocol}://${req.get('host')}/api/url/${newUrl.shortCode}`,
  });
});

export const redirectURL = asyncWrapper(async (req, res) => {
  const { shortCode } = req.params;
  logger.info('Parsing the user agent object');
  const ua = UAParser(req.headers['user-agent']);
  const url = await URLModel.findOne({ shortCode });
  if (!url) {
    logger.warn(
      `No such shortCode ${shortCode} has been created for any long URL`
    );
    const error = new Error(
      'No url found for the shortcode, please try shortcoding the URL first'
    );
    error.statusCode = 404;
    throw error;
  }
  url.analytics.push({
    user_agent: ua.ua,
    browser: ua.browser.name,
    os: ua.os.name,
    deviceModel: ua.device.model,
  });
  url.clickCount += 1;
  await url.save();
  logger.info('URL analytics saved');
  logger.info(`Redirecting into original URL ${url.originalURL}`);
  res.redirect(url.originalURL);
});

export const getAnalytics = asyncWrapper(async (req, res) => {
  const userId = req.user;
  const { shortCode } = req.params;
  const url = await URLModel.findOne({ shortCode });
  if (!url) {
    logger.warn(
      `No such shortCode ${shortCode} has been created for any long URL`
    );
    const error = new Error(
      'No url found for the shortcode, please try shortcoding the URL first before checking the analytics'
    );
    error.statusCode = 404;
    throw error;
  }
  if (userId !== url.owner.toString()) {
    logger.warn(`The ${shortCode} is not oned by user ${userId}`);
    const error = new Error('User unauthorized to access the shortCode');
    error.statusCode = 403;
    throw error;
  }
  return res.json({
    originalURL: url.originalURL,
    shortCode: url.shortCode,
    clickCount: url.clickCount,
    recentVisitAnalytics: url.analytics.slice(-5),
    createdAt: url.createdAt,
  });
});
