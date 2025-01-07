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
exports.litActionCode = void 0;
// Filename: litAction.ts
// @ts-nocheck
const _DistributelitActionCode = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const toSign = yield LitActions.runOnce({ waitForResponse: true, name: "Distribute the funding to people" }, () => __awaiter(void 0, void 0, void 0, function* () {
            // Provider connection
            const provider = new ethers.providers.JsonRpcProvider(chainRPC);
            // Wallet setup
            const wallet = new ethers.Wallet(privatKey, provider);
            // Token contract
            // const tokenAddress = "0xa16302dBFD70c65a25E797ae41B3306E6E102eaF";
            const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);
            const amountToSend = ethers.utils.parseUnits(amount, 18); // 10 tokens
            // Distribute tokens
            for (const recipient of recipients) {
                try {
                    const tx = yield tokenContract.transfer(recipient, amountToSend);
                    yield tx.wait();
                    console.log(`Sent ${amountToSend} tokens to ${recipient}`);
                }
                catch (error) {
                    console.error(`Failed to send to ${recipient}:`, error);
                }
            }
        }));
        const signature = yield Lit.Actions.signEcdsa({
            toSign: ethers.utils.arrayify(ethers.utils.keccak256(ethers.utils.toUtf8Bytes(toSign))),
            publicKey,
            sigName: "distributeToken",
        });
        LitActions.setResponse({ response: "true" });
    }
    catch (e) {
        LitActions.setResponse({ response: e.message });
    }
});
// // Filename: litAction.ts
// // @ts-nocheck
// const _DistributelitActionCode = async () => {
//   try {
//     const toSign = await LitActions.runOnce(
//       { waitForResponse: true, name: "Distribute the funding to people" },
//       async () => {
//         // sign unsigned transaction
//         // Provider connection
//         // Distribute tokens
//         for (const recipient of recipients) {
//           try {
//             const tx = await tokenContract.transfer(recipient, amountToSend);
//             await tx.wait();
//             console.log(`Sent ${amountToSend} tokens to ${recipient}`);
//           } catch (error) {
//             console.error(`Failed to send to ${recipient}:`, error);
//           }
//         }
//       }
//     );
//     // sign unsigned transaction
//     const signature = await Lit.Actions.signEcdsa({
//       toSign: ethers.utils.arrayify(
//         ethers.utils.keccak256(ethers.utils.toUtf8Bytes(toSign))
//       ),
//       publicKey,
//       sigName: "distributeToken",
//     });
//     LitActions.setResponse({ response: "true" });
//   } catch (e) {
//     LitActions.setResponse({ response: e.message });
//   }
// };
// @ts-nocheck
// const createWalletLitAction = async () => {
//   try {
//     const { Wallet } = require("ethers");
//     // Step 1: Generate a new Ethereum wallet
//     const newWallet = Wallet.createRandom();
//     const privateKey = newWallet.privateKey;
//     const walletAddress = newWallet.address;
//     // Access Control Conditions
//     const accessControlConditions = [
//       {
//         contractAddress: "",
//         standardContractType: "",
//         chain: "ethereum",
//         method: "",
//         parameters: [":userAddress"],
//         returnValueTest: {
//           comparator: "=",
//           value: "0xUserAddress", // Replace with the user's wallet address condition
//         },
//       },
//     ];
//     // Step 2: Encrypt the private key using Lit Protocol
//     const encryptedPrivateKey = await Lit.Actions.encryptString({
//       string: privateKey,
//       accessControlConditions,
//       chain: "ethereum",
//       authSig: null, // Provide the authSig for your integration
//     });
//     // Step 3: Set response to return the wallet address and encrypted key
//     Lit.Actions.setResponse({
//       response: {
//         walletAddress,
//         encryptedPrivateKey,
//       },
//     });
//   } catch (error) {
//     Lit.Actions.setResponse({
//       response: { error: error.message },
//     });
//   }
// };
// Filename: litAction.ts
// @ts-nocheck
// const _createWalletLitAction = async () => {
//   try {
//     const keyInfo = await LitActions.runOnce(
//       { waitForResponse: true, name: "Create an Agent Wallet" },
//       async () => {
//         const newWallet = ethers.Wallet.createRandom().connect(
//           new ethers.providers.JsonRpcProvider("https://sepolia.base.org")
//         );
//         const privateKey = newWallet.privateKey;
//         const walletAddress = newWallet.address;
//         console.log("Wallet Address:", walletAddress);
//         console.log("Private Key:", privateKey);
//         return {
//           privateKey,
//           walletAddress,
//         };
//       }
//     );
//     const accessControlConditions: AccessControlConditions = [
//       {
//         contractAddress: "",
//         standardContractType: "",
//         chain: "ethereum",
//         method: "eth_getBalance",
//         parameters: [":userAddress", "latest"],
//         returnValueTest: {
//           comparator: ">=",
//           value: "0",
//         },
//       },
//     ];
//     console.log("Key Info:", keyInfo.privateKey);
//     // console.log("Public Key:", publicKey);
//     // to
//     // // Step 2: Encrypt the private key using Lit Protocol
//     const encryptedPrivateKey = await Lit.Actions.encrypt(
//       accessControlConditions.toString(),
//       keyInfo.privateKey.toString()
//     );
//     const signature = await Lit.Actions.signEcdsa({
//       toSign: ethers.utils.arrayify(
//         ethers.utils.keccak256(ethers.utils.toUtf8Bytes(keyInfo))
//       ),
//       publicKey,
//       sigName: "createAgentWallet",
//     });
//     Lit.Actions.setResponse({
//       response: true,
//     });
//   } catch (e) {
//     Lit.Actions.setResponse({ response: e.message });
//   }
// };
// Exporting the Lit Action code as a string
exports.litActionCode = `(${_DistributelitActionCode.toString()})();`;
//# sourceMappingURL=litAction.js.map