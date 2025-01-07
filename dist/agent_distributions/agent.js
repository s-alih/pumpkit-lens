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
Object.defineProperty(exports, "__esModule", { value: true });
const coinbase_sdk_1 = require("@coinbase/coinbase-sdk");
let coinbase = coinbase_sdk_1.Coinbase.configureFromJson({
    filePath: "~/Downloads/cdp_api_key.json",
});
const createKOLAgent = () => __awaiter(void 0, void 0, void 0, function* () {
    let wallet = yield coinbase_sdk_1.Wallet.create();
    console.log(`Wallet successfully created: `, wallet.toString());
    let address = yield wallet.getDefaultAddress();
    console.log(`Default address: `, address.toString());
});
const walletToDistribute = ["0x123", "0x456", "0x789"];
const distributeWallets = () => __awaiter(void 0, void 0, void 0, function* () {
    let wallet = yield coinbase_sdk_1.Wallet.create();
    const distributionAmount = 120;
    const singleDistributionAmount = distributionAmount / walletToDistribute.length;
    for (const distributingWallet in walletToDistribute) {
        const transfer = yield wallet.createTransfer({
            destination: distributingWallet,
            amount: singleDistributionAmount,
            assetId: coinbase_sdk_1.Coinbase.assets.Eth,
        });
    }
});
// const submitCampaign = async (campaign: string) => {
//   let wallet = await Wallet.create();
//   console.log(`Wallet successfully created: `, wallet.toString());
//   let address = await wallet.getDefaultAddress();
//   console.log(`Default address: `, address.toString());
//   let campaignId = await coinbase.createCampaign(campaign, wallet);
//   console.log(`Campaign successfully created: `, campaignId);
// };
//# sourceMappingURL=agent.js.map