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
const _litActionCode = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const toSign = yield LitActions.runOnce({ waitForResponse: true, name: "Distribute function" }, () => __awaiter(void 0, void 0, void 0, function* () {
            // Provider connection
            const provider = new ethers.providers.JsonRpcProvider("https://sepolia.base.org");
            // Wallet setup
            const wallet = new ethers.Wallet("8950e1a15da5b3b37cd97a02832ec167297f5f16d8f4462387140b5375b1eab6", provider);
            // Token contract
            const tokenAddress = "0xa16302dBFD70c65a25E797ae41B3306E6E102eaF";
            const tokenABI = [
                "function transfer(address to, uint amount) public returns (bool)",
            ];
            const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);
            // Recipients and amounts
            const recipients = [
                "0x1224D241f6D0400284A22470b2A8af9Ee6bE15E0",
                "0x97Aaa4c6b695A21B76E9720676D35099854E3868",
            ];
            const amountToSend = ethers.utils.parseUnits("10", 18); // 10 tokens
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
exports.litActionCode = `(${_litActionCode.toString()})();`;
//# sourceMappingURL=litAction.js.map