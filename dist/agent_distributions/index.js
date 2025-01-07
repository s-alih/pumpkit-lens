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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePKP = void 0;
// Filename: index.ts
const lit_node_client_1 = require("@lit-protocol/lit-node-client");
const constants_1 = require("@lit-protocol/constants");
const auth_helpers_1 = require("@lit-protocol/auth-helpers");
const contracts_sdk_1 = require("@lit-protocol/contracts-sdk");
const lit_auth_client_1 = require("@lit-protocol/lit-auth-client");
const ethers = __importStar(require("ethers"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const litAction_1 = require("./litAction");
const analayzeTweetData_1 = require("./analayzeTweetData");
// Import AI model or library for analysis (e.g., TensorFlow.js or OpenAI)
//  Example AI analysis module
const { ETHEREUM_PRIVATE_KEY, CHAIN_RPC } = process.env;
const NETWORK = constants_1.LIT_NETWORK.DatilDev;
// Filepath for PKP info and tweet data
const PKP_INFO_FILE = path_1.default.join(__dirname, "pkpInfo.json");
const TWEET_DATA_FILE = path_1.default.join(__dirname, "tweetData.json");
const recipients = [
    "0x1224D241f6D0400284A22470b2A8af9Ee6bE15E0",
    "0x97Aaa4c6b695A21B76E9720676D35099854E3868",
];
// Function to generate PKP
const generatePKP = () => __awaiter(void 0, void 0, void 0, function* () {
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
        // Mint PKP
        const pkp = (yield litContracts.pkpNftContractUtils.write.mint()).pkp;
        console.log("PKP: ", pkp);
        // Authenticate with Lit
        const authMethod = yield lit_auth_client_1.EthWalletProvider.authenticate({
            signer: ethersWallet,
            litNodeClient,
        });
        // Get PKP session signatures
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
        console.log("PKP Generated Successfully!");
        return {
            pkp,
            pkpSessionSigs,
        };
    }
    catch (error) {
        console.error("Error generating PKP:", error);
        throw error;
    }
    finally {
        litNodeClient === null || litNodeClient === void 0 ? void 0 : litNodeClient.disconnect();
    }
});
exports.generatePKP = generatePKP;
// Function to distribute tokens based on AI analysis of tweet data
const distributeTokensWithAI = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (tokenAmount = "10", tokenAddress) {
    try {
        // Load PKP info
        if (!fs.existsSync(PKP_INFO_FILE)) {
            throw new Error("PKP Info file does not exist. Create the agent first.");
        }
        // await litNodeClient.connect();
        // Load Tweet Data
        if (!fs.existsSync(TWEET_DATA_FILE)) {
            throw new Error("Tweet data file does not exist.");
        }
        const tweetData = JSON.parse(fs.readFileSync(TWEET_DATA_FILE, "utf-8"));
        console.log("Loaded Tweet Data:", tweetData);
        // Analyze tweet data using AI
        const distributionDecision = yield (0, analayzeTweetData_1.analyzeTweetData)(tweetData, tokenAmount); // Returns a decision object
        console.log("AI Analysis Result:", distributionDecision);
        // console the result in readabel way
        console.log("AI Analysis Result:", JSON.stringify(distributionDecision, null, 2));
        // Check if distribution should happen
        if (!distributionDecision.shouldDistribute) {
            console.log("Distribution not required based on AI analysis.");
            return;
        }
        // // Calculate staged distribution
        // const totalAmount = ethers.utils.parseUnits(tokenAmount, 18); // Example total amount to distribute
        const stages = distributionDecision.stages || 3;
        // // const stages = 1;
        // const stageAmount = totalAmount.div(stages);
        const pkpInfo = JSON.parse(fs.readFileSync(PKP_INFO_FILE, "utf-8"));
        const { pkp, pkpSessionSigs } = pkpInfo;
        const litNodeClient = new lit_node_client_1.LitNodeClient({
            litNetwork: NETWORK,
            debug: false,
        });
        yield litNodeClient.connect();
        const ethersWallet = new ethers.Wallet(ETHEREUM_PRIVATE_KEY, new ethers.providers.JsonRpcProvider(constants_1.LIT_RPC.CHRONICLE_YELLOWSTONE));
        const litContracts = new contracts_sdk_1.LitContracts({
            signer: ethersWallet,
            network: NETWORK,
            debug: false,
        });
        yield litContracts.connect();
        for (let stage = 1; stage <= stages; stage++) {
            const stageAmount = ethers.utils.parseUnits(distributionDecision.distributionPlan[stage - 1].tokens.toString(), 18);
            console.log(`Distributing ${ethers.utils.formatUnits(stageAmount, 18)} tokens in ${stages} stages.`);
            const stageDate = new Date();
            stageDate.setDate(stageDate.getDate() + stage * 30); // Calculate stage date (30, 60, 90 days, etc.)
            console.log(`Scheduling stage ${stage} to run at: ${stageDate.toISOString()}`);
            node_schedule_1.default.scheduleJob(stageDate, () => __awaiter(void 0, void 0, void 0, function* () {
                console.log(`Starting distribution stage ${stage}...`);
                try {
                    const result = yield litNodeClient.executeJs({
                        sessionSigs: pkpSessionSigs,
                        code: litAction_1.litActionCode,
                        jsParams: {
                            publicKey: pkp.publicKey,
                            privatKey: ETHEREUM_PRIVATE_KEY,
                            chainRPC: CHAIN_RPC,
                            amount: ethers.utils.formatUnits(stageAmount, 18),
                            // recipients: distributionDecision.recipients, // Recipients from AI analysis
                            recipients: recipients,
                            tokenAddress,
                            tokenABI: [
                                "function transfer(address to, uint amount) public returns (bool)",
                            ],
                        },
                    });
                    // console.log(`Stage ${stage} distribution complete. Result:`, result);
                }
                catch (error) {
                    console.error(`Error in stage ${stage} distribution:`, error);
                }
            }));
        }
        console.log("Token distribution completed.");
    }
    catch (error) {
        console.error("Error distributing tokens:", error);
    }
});
// async function getRecipientsFromFile(filePath: string): Promise<string[]> {
//   try {
//     const fileContent = await fs.readFile(filePath, "utf8");
//     const data = JSON.parse(fileContent);
//     if (data.recipients && Array.isArray(data.recipients)) {
//       return data.recipients;
//     } else {
//       throw new Error("Invalid recipients format in file.");
//     }
//   } catch (error) {
//     console.error("Error reading recipients from file:", error);
//     throw error;
//   }
// }
function scheduleJobForTenDaysLater() {
    // Calculate the date and time 10 days from now
    const runDate = new Date();
    runDate.setDate(runDate.getDate() + 10);
    console.log(`Job scheduled to run at: ${runDate.toISOString()}`);
    // Schedule the job using node-schedule
    node_schedule_1.default.scheduleJob(runDate, () => {
        distributeTokensWithAI("1000", "0xa16302dBFD70c65a25E797ae41B3306E6E102eaF");
    });
}
// distributeTokensWithAI("20", "0xa16302dBFD70c65a25E797ae41B3306E6E102eaF");
scheduleJobForTenDaysLater();
// // Execute functions
// (async () => {
//   await generatePKP();
//   await distributeTokensWithAI();
// })();
// create
//# sourceMappingURL=index.js.map