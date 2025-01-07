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
exports.getTokenBalances = exports.getDeployedContracts = void 0;
const const_1 = require("../constants/const");
const { Alchemy, Utils, Network } = require("alchemy-sdk");
const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.BASE_MAINNET,
};
const alchemy = new Alchemy(settings);
const getDeployedContracts = (address) => __awaiter(void 0, void 0, void 0, function* () {
    const transfers = [];
    //   console.log(process.env.ALCHEMY_API_KEY);
    //   console.log(settings);
    let response = yield alchemy.core.getAssetTransfers({
        fromBlock: const_1.FROM_BLOCK,
        toBlock: const_1.TO_BLOCK,
        fromAddress: address,
        excludeZeroValue: false,
        category: ["external"],
    });
    console.log(response);
    transfers.push(...response.transfers);
    while (response.pageKey) {
        let pageKey = response.pageKey;
        response = yield alchemy.core.getAssetTransfers({
            fromBlock: const_1.FROM_BLOCK,
            toBlock: const_1.TO_BLOCK,
            fromAddress: address,
            excludeZeroValue: false,
            category: ["external"],
            pageKey: pageKey,
        });
        transfers.push(...response.transfers);
    }
    const deployments = transfers.filter((transfer) => transfer.to === null);
    const txHashes = deployments.map((deployment) => deployment.hash);
    const promises = txHashes.map((hash) => alchemy.core.getTransactionReceipt(hash));
    const receipts = yield Promise.all(promises);
    const contractAddresses = receipts.map((receipt) => receipt === null || receipt === void 0 ? void 0 : receipt.contractAddress);
    // console.log(contractAddresses);
    return { contractAddresses };
});
exports.getDeployedContracts = getDeployedContracts;
const getTokenBalances = (address) => __awaiter(void 0, void 0, void 0, function* () {
    const balances = yield alchemy.core.getTokenBalances(address);
    const nonZeroBalances = balances.tokenBalances.filter((token) => {
        return (token.tokenBalance !==
            "0x0000000000000000000000000000000000000000000000000000000000000000");
    });
    const tokenBalanceList = [];
    let i = 1;
    for (let token of nonZeroBalances) {
        let balance = token.tokenBalance;
        const metadata = yield alchemy.core.getTokenMetadata(token.contractAddress);
        balance = balance / Math.pow(10, metadata.decimals);
        balance = balance.toFixed(2);
        tokenBalanceList.push({
            name: metadata.name,
            balance: balance,
            symbol: metadata.symbol,
        });
        // console.log("fetching");
    }
    return { tokenBalanceList };
});
exports.getTokenBalances = getTokenBalances;
//# sourceMappingURL=address.js.map