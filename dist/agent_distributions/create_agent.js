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
const ethers_1 = require("ethers");
const createAgentRandomWallet = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wallet = ethers_1.ethers.Wallet.createRandom().connect(new ethers_1.ethers.providers.JsonRpcProvider("https://sepolia.base.org"));
        console.log(wallet.privateKey);
    }
    catch (e) {
        console.error(e);
    }
});
createAgentRandomWallet();
//# sourceMappingURL=create_agent.js.map