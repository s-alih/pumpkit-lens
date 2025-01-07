"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeckoTokenData = void 0;
const axios_1 = __importDefault(require("axios"));
const const_1 = require("../constants/const");
//function to get token data from the api
const getGeckoTokenData = (contractAddress, chainId) => __awaiter(void 0, void 0, void 0, function* () {
    //axios get request to api.gopluslabs.io/api/v1/token_security/1?contract_addresses=
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const infoResponse = yield axios_1.default.get(`${const_1.API_BASE_URLS.GECKO}networks/${chainId}/tokens/${contractAddress}/info`);
    //   data: {
    //     id: 'eth_0xdac17f958d2ee523a2206206994597c13d831ec7',
    //     type: 'token',
    //     attributes: {
    //       address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    //       name: 'Tether USD',
    //       symbol: 'USDT',
    //       decimals: 6,
    //       image_url: 'https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    //       coingecko_coin_id: 'tether',
    //       websites: [Array],
    //       description: 'Tether (USDT) is a cryptocurrency with a value meant to mirror the value of the U.S. dollar. The idea was to create a stable cryptocurrency that can be used like digital dollars. Coins that serve this purpose of being a stable dollar substitute are called “stable coins.” Tether is the most popular stable coin and even acts as a dollar replacement on many popular exchanges! According to their site, Tether converts cash into digital currency, to anchor or “tether” the value of the coin to the price of national currencies like the US dollar, the Euro, and the Yen. Like other cryptos it uses blockchain. Unlike other cryptos, it is [according to the official Tether site] “100% backed by USD” (USD is held in reserve). The primary use of Tether is that it offers some stability to the otherwise volatile crypto space and offers liquidity to exchanges who can’t deal in dollars and with banks (for example to the sometimes controversial but leading exchange <a href="https://www.coingecko.com/en/exchanges/bitfinex">Bitfinex</a>).\r\n' +
    //         '\r\n' +
    //         'The digital coins are issued by a company called Tether Limited that is governed by the laws of the British Virgin Islands, according to the legal part of its website. It is incorporated in Hong Kong. It has emerged that Jan Ludovicus van der Velde is the CEO of cryptocurrency exchange Bitfinex, which has been accused of being involved in the price manipulation of bitcoin, as well as tether. Many people trading on exchanges, including Bitfinex, will use tether to buy other cryptocurrencies like bitcoin. Tether Limited argues that using this method to buy virtual currencies allows users to move fiat in and out of an exchange more quickly and cheaply. Also, exchanges typically have rocky relationships with banks, and using Tether is a way to circumvent that.\r\n' +
    //         '\r\n' +
    //         'USDT is fairly simple to use. Once on exchanges like <a href="https://www.coingecko.com/en/exchanges/poloniex">Poloniex</a> or Bittrex, it can be used to purchase Bitcoin and other cryptocurrencies. It can be easily transferred from an exchange to any Omni Layer enabled wallet. Tether has no transaction fees, although external wallets and exchanges may charge one. In order to convert USDT to USD and vise versa through the Tether.to Platform, users must pay a small fee. Buying and selling Tether for Bitcoin can be done through a variety of exchanges like the ones mentioned previously or through the Tether.to platform, which also allows the conversion between USD to and from your bank account.\r\n' +
    //         '\r\n',
    //       gt_score: 92.66055045871559,
    //       discord_url: null,
    //       telegram_handle: null,
    //       twitter_handle: 'Tether_to',
    //       categories: [],
    //       gt_category_ids: []
    //     }
    //   }
    const tokenResponse = yield axios_1.default.get(`${const_1.API_BASE_URLS.GECKO}networks/${chainId}/tokens/${contractAddress}`);
    //   console.log(tokenResponse.data);
    // {
    //   data: {
    //     id: 'eth_0xdac17f958d2ee523a2206206994597c13d831ec7',
    //     type: 'token',
    //     attributes: {
    //       address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    //       name: 'Tether USD',
    //       symbol: 'USDT',
    //       decimals: 6,
    //       image_url: 'https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    //       coingecko_coin_id: 'tether',
    //       total_supply: '76926220145483487.0',
    //       price_usd: '0.99504277',
    //       fdv_usd: '76544774865',
    //       total_reserve_in_usd: '386202041.16769799344158519263429966300749557209240213386907848157102297140605',
    //       volume_usd: [Object],
    //       market_cap_usd: '139897462297.934'
    //     },
    //     relationships: { top_pools: [Object] }
    //   }
    // }
    const infoAttributes = infoResponse.data.data.attributes;
    const tokenAttributes = tokenResponse.data.data.attributes;
    // console.log(contextAttributes);
    const geckoTokenData = {
        decimals: (_a = infoAttributes === null || infoAttributes === void 0 ? void 0 : infoAttributes.decimals) !== null && _a !== void 0 ? _a : null,
        image_url: (_b = infoAttributes === null || infoAttributes === void 0 ? void 0 : infoAttributes.image_url) !== null && _b !== void 0 ? _b : null,
        description: (_c = infoAttributes === null || infoAttributes === void 0 ? void 0 : infoAttributes.description) !== null && _c !== void 0 ? _c : null,
        website: (_e = (_d = infoAttributes === null || infoAttributes === void 0 ? void 0 : infoAttributes.websites) === null || _d === void 0 ? void 0 : _d[0]) !== null && _e !== void 0 ? _e : null,
        twitter_handle: (_f = infoAttributes === null || infoAttributes === void 0 ? void 0 : infoAttributes.twitter_handle) !== null && _f !== void 0 ? _f : null,
        gt_score: (_g = infoAttributes === null || infoAttributes === void 0 ? void 0 : infoAttributes.gt_score) !== null && _g !== void 0 ? _g : null,
        price_usd: (_h = tokenAttributes === null || tokenAttributes === void 0 ? void 0 : tokenAttributes.price_usd) !== null && _h !== void 0 ? _h : null,
        fdv_usd: (_j = tokenAttributes === null || tokenAttributes === void 0 ? void 0 : tokenAttributes.fdv_usd) !== null && _j !== void 0 ? _j : null,
        volume_usd: (_l = (_k = tokenAttributes === null || tokenAttributes === void 0 ? void 0 : tokenAttributes.volume_usd) === null || _k === void 0 ? void 0 : _k.h24) !== null && _l !== void 0 ? _l : null,
        total_reserve_in_usd: (_m = tokenAttributes === null || tokenAttributes === void 0 ? void 0 : tokenAttributes.total_reserve_in_usd) !== null && _m !== void 0 ? _m : null,
        market_cap_usd: (_o = tokenAttributes === null || tokenAttributes === void 0 ? void 0 : tokenAttributes.market_cap_usd) !== null && _o !== void 0 ? _o : null,
    };
    return geckoTokenData;
});
exports.getGeckoTokenData = getGeckoTokenData;
//# sourceMappingURL=gecko.js.map