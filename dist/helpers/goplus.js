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
exports.getGoPlusData = void 0;
const axios_1 = __importDefault(require("axios"));
const const_1 = require("../constants/const");
//function to get token data from the api
const getGoPlusData = (contractAddress, chainId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8;
    ;
    const response = yield axios_1.default.get(`${const_1.API_BASE_URLS.GOPLUS}token_security/${chainId}?contract_addresses=${contractAddress}`);
    //   console.log(response.data);
    const contextResponse = response.data.result[contractAddress.toLowerCase()];
    // console.log(response.data.result[contractAddress.toLowerCase()]);
    //map response {
    //   anti_whale_modifiable: '0',
    //   buy_tax: '0',
    //   can_take_back_ownership: '0',
    //   cannot_buy: '0',
    //   cannot_sell_all: '0',
    //   creator_address: '0x36928500bc1dcd7af6a2b4008875cc336b927d57',
    //   creator_balance: '2243.250365',
    //   creator_percent: '0.000000',
    //   dex: [
    //     {
    //       liquidity_type: 'UniV2',
    //       name: 'UniswapV2',
    //       liquidity: '45452719.90132511',
    //       pair: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852'
    //     },
    //     {
    //       liquidity_type: 'UniV3',
    //       name: 'UniswapV3',
    //       liquidity: '30445316.20489937869080554080',
    //       pair: '0x4e68ccd3e89f51c3074ca5072bbac773960dfa36'
    //     },
    //     {
    //       liquidity_type: 'UniV3',
    //       name: 'UniswapV3',
    //       liquidity: '14544948.89733133964588880615',
    //       pair: '0x11b815efb8f581194ae79006d24e0d814b7697f6'
    //     },
    //     {
    //       liquidity_type: 'UniV3',
    //       name: 'UniswapV3',
    //       liquidity: '10933625.376685011',
    //       pair: '0x3416cf6c708da44db2624d63ea0aaef7113527c6'
    //     },
    //     {
    //       liquidity_type: 'UniV3',
    //       name: 'UniswapV3',
    //       liquidity: '9309306.76476058226673251665',
    //       pair: '0xc7bbec68d12a0d1830360f8ec58fa599ba1b0e9b'
    //     },
    //     {
    //       liquidity_type: 'UniV3',
    //       name: 'UniswapV3',
    //       liquidity: '4416415.03349733076193870690',
    //       pair: '0x3470447f3cecffac709d3e783a307790b0208d60'
    //     },
    //     {
    //       liquidity_type: 'UniV2',
    //       name: 'UniswapV2',
    //       liquidity: '2351795.64762500',
    //       pair: '0x3041cbd36888becc7bbcbc0045e3b1f144466f5f'
    //     },
    //     {
    //       liquidity_type: 'UniV3',
    //       name: 'UniswapV3',
    //       liquidity: '1707944.164720794',
    //       pair: '0x7858e59e0c01ea06df3af3d20ac7b0003275d4bf'
    //     },
    //     {
    //       liquidity_type: 'UniV2',
    //       name: 'SushiSwapV2',
    //       liquidity: '1007954.02619752',
    //       pair: '0x06da0fd433c1a5d7a4faa01111c044910a184553'
    //     },
    //     {
    //       liquidity_type: 'UniV3',
    //       name: 'UniswapV3',
    //       liquidity: '749224.502856823127465137359232',
    //       pair: '0xcdfc3d54c8452b12285abb8c102df09ce83b8334'
    //     },
    //     {
    //       liquidity_type: 'UniV3',
    //       name: 'UniswapV3',
    //       liquidity: '629705.149598797733800077633360',
    //       pair: '0x48da0965ab2d2cbf1c17c09cfb5cbe67ad5b1406'
    //     },
    //     {
    //       liquidity_type: 'UniV3',
    //       name: 'UniswapV3',
    //       liquidity: '170485.104195409219410100838376',
    //       pair: '0x6f48eca74b38d2936b02ab603ff4e36a6c0e3a77'
    //     },
    //     {
    //       liquidity_type: 'UniV3',
    //       name: 'UniswapV3',
    //       liquidity: '54595.33127126862930860715',
    //       pair: '0xc5af84701f98fa483ece78af83f11b6c38aca71d'
    //     },
    //     {
    //       liquidity_type: 'UniV3',
    //       name: 'UniswapV3',
    //       liquidity: '17704.2764040',
    //       pair: '0xee4cf3b78a74affa38c6a926282bcd8b5952818d'
    //     },
    //     {
    //       liquidity_type: 'UniV2',
    //       name: 'UniswapV2',
    //       liquidity: '17284.55740723',
    //       pair: '0xb20bd5d04be54f870d5c0d3ca85d82b34b836405'
    //     },
    //     {
    //       liquidity_type: 'UniV3',
    //       name: 'UniswapV3',
    //       liquidity: '11741.45123913710274142587',
    //       pair: '0xfe47dad3d8072a7c5e38202bc4b82d322163e2b6'
    //     },
    //     {
    //       liquidity_type: 'UniV2',
    //       name: 'UniswapV2',
    //       liquidity: '4146.98230927',
    //       pair: '0x5ac13261c181a9c3938bfe1b649e65d10f98566b'
    //     },
    //     {
    //       liquidity_type: 'UniV2',
    //       name: 'SushiSwapV2',
    //       liquidity: '926.16540840',
    //       pair: '0x680a025da7b1be2c204d7745e809919bce074026'
    //     },
    //     {
    //       liquidity_type: 'UniV2',
    //       name: 'SushiSwapV2',
    //       liquidity: '878.55432000',
    //       pair: '0xd86a120a06255df8d4e2248ab04d4267e23adfaa'
    //     },
    //     {
    //       liquidity_type: 'UniV3',
    //       name: 'UniswapV3',
    //       liquidity: '374.516420616370085474091528',
    //       pair: '0x4773e2c1c0b400a16dfec4ca6e305141859a5542'
    //     },
    //     {
    //       liquidity_type: 'UniV2',
    //       name: 'SushiSwapV2',
    //       liquidity: '186.66219960',
    //       pair: '0x055cedfe14bce33f985c41d9a1934b7654611aac'
    //     },
    //     {
    //       liquidity_type: 'UniV3',
    //       name: 'UniswapV3',
    //       liquidity: '74.1834060',
    //       pair: '0xbb256c2f1b677e27118b0345fd2b3894d2e6d487'
    //     },
    //     {
    //       liquidity_type: 'UniV2',
    //       name: 'UniswapV2',
    //       liquidity: '72.26682892',
    //       pair: '0xe3ffab89e53422f468be955e7011932efe80aa26'
    //     },
    //     {
    //       liquidity_type: 'UniV2',
    //       name: 'SushiSwapV2',
    //       liquidity: '18.05827304',
    //       pair: '0x8b79c78f7aa289a7e9bde311a21ffdba4ab493e3'
    //     },
    //     {
    //       liquidity_type: 'UniV3',
    //       name: 'UniswapV3',
    //       liquidity: '14.25930186342635448120',
    //       pair: '0x206c9f6ad08a8f2a3cc05bd3939cd49287560096'
    //     },
    //     {
    //       liquidity_type: 'UniV3',
    //       name: 'UniswapV3',
    //       liquidity: '1.19290615920668703195',
    //       pair: '0x36f7273afb18a3f2fdd07e3ac1c28e65d7ea8f07'
    //     }
    //   ],
    //   external_call: '1',
    //   hidden_owner: '0',
    //   holder_count: '6573436',
    //   holders: [
    //     {
    //       address: '0xf977814e90da44bfa03b6295a0616a897441acec',
    //       tag: '',
    //       is_contract: 0,
    //       balance: '10038557829.816',
    //       percent: '0.130495919477533129',
    //       is_locked: 0
    //     },
    //     {
    //       address: '0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503',
    //       tag: '',
    //       is_contract: 0,
    //       balance: '5184997784.440132',
    //       percent: '0.067402217015657631',
    //       is_locked: 0
    //     },
    //     {
    //       address: '0x835678a611b28684005a5e2233695fb6cbbb0007',
    //       tag: '',
    //       is_contract: 0,
    //       balance: '4082344349.565159',
    //       percent: '0.053068308072911895',
    //       is_locked: 0
    //     },
    //     {
    //       address: '0x5a52e96bacdabb82fd05763e25335261b270efcb',
    //       tag: '',
    //       is_contract: 0,
    //       balance: '3639972862.578815',
    //       percent: '0.047317713722250605',
    //       is_locked: 0
    //     },
    //     {
    //       address: '0xcee284f754e854890e311e3280b767f80797180d',
    //       tag: '',
    //       is_contract: 1,
    //       balance: '3559837327.025587',
    //       percent: '0.046275994326683333',
    //       is_locked: 0
    //     },
    //     {
    //       address: '0xa7a93fd0a276fc1c0197a5b5623ed117786eed06',
    //       tag: '',
    //       is_contract: 1,
    //       balance: '2552605553.922211',
    //       percent: '0.033182516300615093',
    //       is_locked: 0
    //     },
    //     {
    //       address: '0xa7c0d36c4698981fab42a7d8c783674c6fe2592d',
    //       tag: '',
    //       is_contract: 0,
    //       balance: '1720000043.0295',
    //       percent: '0.022359086924804339',
    //       is_locked: 0
    //     },
    //     {
    //       address: '0x28c6c06298d514db089934071355e5743bf21d60',
    //       tag: '',
    //       is_contract: 0,
    //       balance: '1563216840.544453',
    //       percent: '0.020320988573052006',
    //       is_locked: 0
    //     },
    //     {
    //       address: '0xee136c0389733849dd710ac7104e92c6bf497574',
    //       tag: '',
    //       is_contract: 1,
    //       balance: '1385000420',
    //       percent: '0.018004269771485925',
    //       is_locked: 0
    //     },
    //     {
    //       address: '0x99c9fc46f92e8a1c0dec1b1747d010903e884be1',
    //       tag: '',
    //       is_contract: 1,
    //       balance: '947502751.676138',
    //       percent: '0.012317032474547861',
    //       is_locked: 0
    //     }
    //   ],
    //   honeypot_with_same_creator: '0',
    //   is_anti_whale: '0',
    //   is_blacklisted: '1',
    //   is_honeypot: '0',
    //   is_in_cex: { listed: '1', cex_list: [ 'Binance' ] },
    //   is_in_dex: '1',
    //   is_mintble: '1',
    //   is_open_source: '1',
    //   is_proxy: '0',
    //   is_whitelisted: '0',
    //   lp_holder_count: '2403',
    //   lp_holders: [
    //     {
    //       address: '0xe54d527653a70686d5c9fa357e36f18c94f98374',
    //       tag: '',
    //       value: null,
    //       is_contract: 0,
    //       balance: '0.179857313800914812',
    //       percent: '0.635272059807130558',
    //       NFT_list: null,
    //       is_locked: 0
    //     },
    //     {
    //       address: '0x88f0dcce091887f72f3a9fa7b53760e72f91c58d',
    //       tag: '',
    //       value: null,
    //       is_contract: 0,
    //       balance: '0.048279099465045048',
    //       percent: '0.170526081562308440',
    //       NFT_list: null,
    //       is_locked: 0
    //     },
    //     {
    //       address: '0x069d2a5d415894b74c80650a5d67f09e28282b9d',
    //       tag: '',
    //       value: null,
    //       is_contract: 0,
    //       balance: '0.020327557887362157',
    //       percent: '0.071798745889462730',
    //       NFT_list: null,
    //       is_locked: 0
    //     },
    //     {
    //       address: '0xdd3a1b8ff4fe46a7b8ea85ac7d64f2fe08daa253',
    //       tag: '',
    //       value: null,
    //       is_contract: 0,
    //       balance: '0.007052638383199899',
    //       percent: '0.024910547244854061',
    //       NFT_list: null,
    //       is_locked: 0
    //     },
    //     {
    //       address: '0x95f0323bc1efefff9aff3679d2613027f1a263ec',
    //       tag: '',
    //       value: null,
    //       is_contract: 1,
    //       balance: '0.006370079562330457',
    //       percent: '0.022499688665295695',
    //       NFT_list: null,
    //       is_locked: 0
    //     },
    //     {
    //       address: '0x6c3e4cb2e96b01f4b866965a91ed4437839a121a',
    //       tag: '',
    //       value: null,
    //       is_contract: 1,
    //       balance: '0.002297945632080043',
    //       percent: '0.008116548747259575',
    //       NFT_list: null,
    //       is_locked: 0
    //     },
    //     {
    //       address: '0x609e0f0cb16e53878ba5e959a22fc7fcd81b124a',
    //       tag: '',
    //       value: null,
    //       is_contract: 1,
    //       balance: '0.00161263',
    //       percent: '0.005695952864840140',
    //       NFT_list: null,
    //       is_locked: 0
    //     },
    //     {
    //       address: '0x09fc573c502037b149ba87782acc81cf093ec6ef',
    //       tag: '',
    //       value: null,
    //       is_contract: 1,
    //       balance: '0.001156624259017318',
    //       percent: '0.004085299952061723',
    //       NFT_list: null,
    //       is_locked: 0
    //     },
    //     {
    //       address: '0xda169b3359722707776b984ba9abe5d10e6680e1',
    //       tag: '',
    //       value: null,
    //       is_contract: 0,
    //       balance: '0.000937770540940237',
    //       percent: '0.003312289117299834',
    //       NFT_list: null,
    //       is_locked: 0
    //     },
    //     {
    //       address: '0xa798fadbd8dc154007832381c6bd3cdf7daf8695',
    //       tag: '',
    //       value: null,
    //       is_contract: 0,
    //       balance: '0.000667481338160585',
    //       percent: '0.002357603567044588',
    //       NFT_list: null,
    //       is_locked: 0
    //     }
    //   ],
    //   lp_total_supply: '0.283118564754004342',
    //   owner_address: '0xc6cde7c39eb2f0f0095f41570af89efc2c1ea828',
    //   owner_balance: '108983.76699',
    //   owner_change_balance: '1',
    //   owner_percent: '0.000001',
    //   personal_slippage_modifiable: '0',
    //   selfdestruct: '0',
    //   sell_tax: '0',
    //   slippage_modifiable: '1',
    //   token_name: 'Tether USD',
    //   token_symbol: 'USDT',
    //   total_supply: '76926220145.483487',
    //   trading_cooldown: '0',
    //   transfer_pausable: '1',
    //   trust_list: '1'
    // }
    // console.log(contextResponse);
    const tokenGoPlusData = {
        token_name: (_a = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.token_name) !== null && _a !== void 0 ? _a : null,
        token_symbol: (_b = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.token_symbol) !== null && _b !== void 0 ? _b : null,
        buy_tax: (_c = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.buy_tax) !== null && _c !== void 0 ? _c : null,
        sell_tax: (_d = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.sell_tax) !== null && _d !== void 0 ? _d : null,
        total_supply: (_e = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.total_supply) !== null && _e !== void 0 ? _e : null,
        creator_address: (_f = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.creator_address) !== null && _f !== void 0 ? _f : null,
        creator_balance: (_g = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.creator_balance) !== null && _g !== void 0 ? _g : null,
        creator_percent: (_h = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.creator_percent) !== null && _h !== void 0 ? _h : null,
        owner_address: (_j = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.owner_address) !== null && _j !== void 0 ? _j : null,
        owner_balance: (_k = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.owner_balance) !== null && _k !== void 0 ? _k : null,
        owner_percent: (_l = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.owner_percent) !== null && _l !== void 0 ? _l : null,
        lp_total_supply: (_m = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.lp_total_supply) !== null && _m !== void 0 ? _m : null,
        holder_count: (_o = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.holder_count) !== null && _o !== void 0 ? _o : null,
        holders: (_q = (_p = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.holders) === null || _p === void 0 ? void 0 : _p.map((holder) => {
            var _a, _b, _c, _d, _e;
            return ({
                address: (_a = holder.address) !== null && _a !== void 0 ? _a : null,
                is_contract: (_b = holder.is_contract) !== null && _b !== void 0 ? _b : null,
                balance: (_c = holder.balance) !== null && _c !== void 0 ? _c : null,
                percent: (_d = holder.percent) !== null && _d !== void 0 ? _d : null,
                is_locked: (_e = holder.is_locked) !== null && _e !== void 0 ? _e : null,
            });
        })) !== null && _q !== void 0 ? _q : null,
        lp_holder_count: (_r = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.lp_holder_count) !== null && _r !== void 0 ? _r : null,
        lp_holders: (_t = (_s = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.lp_holders) === null || _s === void 0 ? void 0 : _s.map((holder) => {
            var _a, _b, _c, _d, _e;
            return ({
                address: (_a = holder.address) !== null && _a !== void 0 ? _a : null,
                is_contract: (_b = holder.is_contract) !== null && _b !== void 0 ? _b : null,
                balance: (_c = holder.balance) !== null && _c !== void 0 ? _c : null,
                percent: (_d = holder.percent) !== null && _d !== void 0 ? _d : null,
                is_locked: (_e = holder.is_locked) !== null && _e !== void 0 ? _e : null,
            });
        })) !== null && _t !== void 0 ? _t : null,
        honeypot_with_same_creator: (_u = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.honeypot_with_same_creator) !== null && _u !== void 0 ? _u : null,
        is_anti_whale: (_v = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.is_anti_whale) !== null && _v !== void 0 ? _v : null,
        is_blacklisted: (_w = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.is_blacklisted) !== null && _w !== void 0 ? _w : null,
        is_honeypot: (_x = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.is_honeypot) !== null && _x !== void 0 ? _x : null,
        anti_whale_modifiable: (_y = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.anti_whale_modifiable) !== null && _y !== void 0 ? _y : null,
        can_take_back_ownership: (_z = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.can_take_back_ownership) !== null && _z !== void 0 ? _z : null,
        cannot_buy: (_0 = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.cannot_buy) !== null && _0 !== void 0 ? _0 : null,
        cannot_sell_all: (_1 = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.cannot_sell_all) !== null && _1 !== void 0 ? _1 : null,
        is_mintable: (_2 = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.is_mintable) !== null && _2 !== void 0 ? _2 : null,
        is_open_source: (_3 = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.is_open_source) !== null && _3 !== void 0 ? _3 : null,
        is_proxy: (_4 = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.is_proxy) !== null && _4 !== void 0 ? _4 : null,
        is_whitelisted: (_5 = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.is_whitelisted) !== null && _5 !== void 0 ? _5 : null,
        cex: (_7 = (_6 = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.is_in_cex) === null || _6 === void 0 ? void 0 : _6.cex_list) !== null && _7 !== void 0 ? _7 : null,
        dex: (_8 = contextResponse === null || contextResponse === void 0 ? void 0 : contextResponse.dex) !== null && _8 !== void 0 ? _8 : null,
    };
    return tokenGoPlusData;
});
exports.getGoPlusData = getGoPlusData;
// 
//# sourceMappingURL=goplus.js.map