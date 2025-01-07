import { GeckoTokenData } from "GeckoData";
import { GoPlusTokenData } from "GoPlusData";
import { TokenData } from "TokenData";

export function combineTokenData(
  goPlusData: GoPlusTokenData,
  geckoData: GeckoTokenData
): TokenData {
  return {
    name: goPlusData.token_name,
    symbol: goPlusData.token_symbol,
    decimals: geckoData.decimals,
    totalSupply: goPlusData.total_supply,

    priceUSD: geckoData.price_usd,
    marketCapUSD: geckoData.market_cap_usd,
    volumeUSD: geckoData.volume_usd,
    fullyDilutedValueUSD: geckoData.fdv_usd,
    totalReserveUSD: geckoData.total_reserve_in_usd,

    image: geckoData.image_url,
    description: geckoData.description,
    website: geckoData.website,
    twitter: geckoData.twitter_handle,
    gtScore: geckoData.gt_score,

    creatorAddress: goPlusData.creator_address,
    creatorBalance: goPlusData.creator_balance,
    creatorPercent: goPlusData.creator_percent,
    ownerAddress: goPlusData.owner_address,
    ownerBalance: goPlusData.owner_balance,
    ownerPercent: goPlusData.owner_percent,

    holderCount: goPlusData.holder_count,
    holders: goPlusData.holders,
    lpHolderCount: goPlusData.lp_holder_count,
    lpHolders: goPlusData.lp_holders,
    lpTotalSupply: goPlusData.lp_total_supply,

    centralizedExchanges: goPlusData.cex,
    decentralizedExchanges: goPlusData.dex,

    buyTax: goPlusData.buy_tax,
    sellTax: goPlusData.sell_tax,
    isHoneypot: goPlusData.is_honeypot,
    isBlacklisted: goPlusData.is_blacklisted,
    isAntiWhale: goPlusData.is_anti_whale,
    isWhitelisted: goPlusData.is_whitelisted,
    isMintable: goPlusData.is_mintable,
    isOpenSource: goPlusData.is_open_source,
    isProxy: goPlusData.is_proxy,
    canTakeBackOwnership: goPlusData.can_take_back_ownership,
    cannotBuy: goPlusData.cannot_buy,
    cannotSellAll: goPlusData.cannot_sell_all,
    honeypotWithSameCreator: goPlusData.honeypot_with_same_creator,
    antiWhaleModifiable: goPlusData.anti_whale_modifiable,
  };
}
