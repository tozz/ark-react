import { AdEvents, AdSpendData } from './types';

export const generateAdSpendList = (data: AdSpendData[]) => {
  const events: AdEvents = {};

  data.forEach((row) => {
    const date = new Date(row.date_day.value);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const index = `${year}-${month}-${day}`;

    if (!events[index]) {
      events[index] = {channels: {}};
    }
    events[index].channels[row.channel] = row.ad_spend_usd;
  })

  return events;
}
