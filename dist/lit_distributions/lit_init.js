"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.execute = void 0;
// Filename: index.ts
const lit_node_client_1 = require("@lit-protocol/lit-node-client");
const constants_1 = require("@lit-protocol/constants");
const auth_helpers_1 = require("@lit-protocol/auth-helpers");
const contracts_sdk_1 = require("@lit-protocol/contracts-sdk");
const lit_auth_client_1 = require("@lit-protocol/lit-auth-client");
const ethers = __importStar(require("ethers"));
const litAction_1 = require("./litAction");
const { ETHEREUM_PRIVATE_KEY } = process.env;
const NETWORK = constants_1.LIT_NETWORK.DatilDev;
const execute = () => __awaiter(void 0, void 0, void 0, function* () {
    const litNodeClient = new lit_node_client_1.LitNodeClient({
        litNetwork: NETWORK,
        debug: false,
    });
    try {
        const ethersWallet = new ethers.Wallet(ETHEREUM_PRIVATE_KEY, new ethers.providers.JsonRpcProvider(constants_1.LIT_RPC.CHRONICLE_YELLOWSTONE));
        yield litNodeClient.connect();
        const litContracts = new contracts_sdk_1.LitContracts({
            signer: ethersWallet,
            network: NETWORK,
            debug: false,
        });
        yield litContracts.connect();
        const pkp = (yield litContracts.pkpNftContractUtils.write.mint()).pkp;
        console.log("PKP: ", pkp);
        const authMethod = yield lit_auth_client_1.EthWalletProvider.authenticate({
            signer: ethersWallet,
            litNodeClient,
        });
        const pkpSessionSigs = yield litNodeClient.getPkpSessionSigs({
            pkpPublicKey: pkp.publicKey,
            chain: "ethereum",
            authMethods: [authMethod],
            resourceAbilityRequests: [
                {
                    resource: new auth_helpers_1.LitActionResource("*"),
                    ability: constants_1.LIT_ABILITY.LitActionExecution,
                },
                { resource: new auth_helpers_1.LitPKPResource("*"), ability: constants_1.LIT_ABILITY.PKPSigning },
            ],
        });
        const result = yield litNodeClient.executeJs({
            sessionSigs: pkpSessionSigs,
            code: litAction_1.litActionCode,
            jsParams: { publicKey: pkp.publicKey },
        });
        console.log(result);
        return result;
    }
    catch (error) {
        console.error(error);
    }
    finally {
        litNodeClient === null || litNodeClient === void 0 ? void 0 : litNodeClient.disconnect();
    }
});
exports.execute = execute;
(0, exports.execute)();
//# sourceMappingURL=lit_init.js.map