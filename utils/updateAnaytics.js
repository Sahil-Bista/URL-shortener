import { UAParser } from 'ua-parser-js';
import { URLModel } from '../models/URL.js';
import { logger } from '../logger/index.js';

export const updateAnalytics = async (shortCode, userAgent) => {
  try {
    const ua = UAParser(userAgent);
    await URLModel.updateOne(
      { shortCode },
      {
        $inc: { clickCount: 1 },
        $push: {
          analytics: {
            user_agent: ua.ua,
            browser: ua.browser.name,
            os: ua.os.name,
            deviceModel: ua.device.model,
            timestamp: new Date(),
          },
        },
      }
    );
  } catch (err) {
    console.error('Analytics update failed:', err);
    logger.error('Analytics update failed:', err);
  }
};
