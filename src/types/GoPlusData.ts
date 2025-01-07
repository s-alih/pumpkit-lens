import { DexPool } from "DexPool";
import { TokenHolder } from "TokenHolder";

export interface GoPlusTokenData {
  token_name: string;
  token_symbol: string;
  buy_tax: string;
  sell_tax: string;
  total_supply: string;
  creator_address: string;
  creator_balance: string;
  creator_percent: string;
  owner_address: string;
  owner_balance: string;
  owner_percent: string;
  lp_total_supply: string;
  holder_count: string;
  holders: TokenHolder[];
  lp_holder_count: string;
  lp_holders: TokenHolder[];
  honeypot_with_same_creator: string;
  is_anti_whale: string;
  is_blacklisted: string;
  is_honeypot: string;
  anti_whale_modifiable: string;
  can_take_back_ownership: string;
  cannot_buy: string;
  cannot_sell_all: string;
  is_mintable: string;
  is_open_source: string;
  is_proxy: string;
  is_whitelisted: string;
  cex: string[];
  dex: DexPool[];
}
