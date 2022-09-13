export type Channels = 'adwords' | 'facebook';

export interface AdSpendData {
  date_day: { value: string };
  channel: Channels;
  ad_spend_usd: number;
}

export type AdEvents  = { [date: string]: { channels: { [source: string]: number} } };
