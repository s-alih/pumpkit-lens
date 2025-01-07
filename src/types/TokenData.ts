import { DexPool } from "DexPool";
import { TokenHolder } from "TokenHolder";


export interface TokenData {
  // Basic token information
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;

  // Price and market data
  priceUSD: string;
  marketCapUSD: string;
  volumeUSD: string;
  fullyDilutedValueUSD: string;
  totalReserveUSD: string;

  // Token metadata
  image: string;
  description: string;
  website: string;
  twitter: string | null;
  gtScore: number;

  // Security and structure
  creatorAddress: string;
  creatorBalance: string;
  creatorPercent: string;
  ownerAddress: string;
  ownerBalance: string;
  ownerPercent: string;

  // Holders information
  holderCount: string;
  holders: TokenHolder[];
  lpHolderCount: string;
  lpHolders: TokenHolder[];
  lpTotalSupply: string;

  // Exchange listings
  centralizedExchanges: string[];
  decentralizedExchanges: DexPool[];

  // Security flags
  buyTax: string;
  sellTax: string;
  isHoneypot: string;
  isBlacklisted: string;
  isAntiWhale: string;
  isWhitelisted: string;
  isMintable: string;
  isOpenSource: string;
  isProxy: string;
  canTakeBackOwnership: string;
  cannotBuy: string;
  cannotSellAll: string;
  honeypotWithSameCreator: string;
  antiWhaleModifiable: string;
}
