// Interface for CoinGecko token data
export interface GeckoTokenData {
  decimals: number;
  image_url: string;
  description: string;
  website: string;
  twitter_handle: string | null;
  gt_score: number;
  price_usd: string;
  fdv_usd: string;
  volume_usd: string;
  total_reserve_in_usd: string;
  market_cap_usd: string;
}
