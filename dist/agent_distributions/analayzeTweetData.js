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
exports.analyzeTweetData = analyzeTweetData;
const generative_ai_1 = require("@google/generative-ai");
// Create a new instance of GoogleGenerativeAI with the current API key
function createGenAIInstance() {
    const apiKey = "AIzaSyA0nnPK11pJKS5myavpEieLnDooDpC4PJM";
    return new generative_ai_1.GoogleGenerativeAI(apiKey);
}
function analyzeTweetData(tweetData, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const genAI = createGenAIInstance();
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // Generate a prompt for AI analysis
        const prompt = `
      Analyze the following Twitter data and decide if token distribution should occur. Provide detailed reasoning:
      ${JSON.stringify(tweetData, null, 2)} and returning the distribution plan of tokens to distribute the total amount of ${amount}
      Return a decision like: and this should be in the json formate string and should form the formate of the DistributionDecision json no sentences, it should start with
      {
        "shouldDistribute": true/false,
        "stages": number of stages,
        "recipients": ["address1", "address2", ...],
        "distributionPlan": [
          {"stage": 1, "tokens": ${amount}, "condition": "..."},
          {"stage": 2, "tokens": ${amount}, "condition": "..."}
        ]
      }
    `;
        const result = yield model.generateContent(prompt);
        const modelResponse = (_a = result.response) === null || _a === void 0 ? void 0 : _a.text();
        const firstIndex = modelResponse === null || modelResponse === void 0 ? void 0 : modelResponse.indexOf("{");
        const lastIndex = modelResponse === null || modelResponse === void 0 ? void 0 : modelResponse.lastIndexOf("}");
        const response = modelResponse === null || modelResponse === void 0 ? void 0 : modelResponse.substring(firstIndex, lastIndex + 1);
        // Parse the response and ensure it matches the interface
        console.log("AI Analysis Result:", (_b = result.response) === null || _b === void 0 ? void 0 : _b.text());
        const distributionDecision = JSON.parse(response || "{}");
        return distributionDecision;
    });
}
//# sourceMappingURL=analayzeTweetData.js.map