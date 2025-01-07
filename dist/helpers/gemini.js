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
exports.generateTwitterPost = exports.summarizeContract = void 0;
const const_1 = require("../constants/const");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const summarizeContract = (contractData) => __awaiter(void 0, void 0, void 0, function* () {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    if (contractData) {
        const finalPrompt = const_1.CONTRACT_PROMPT + contractData;
        const result = yield model.generateContent(finalPrompt);
        const response = yield result.response;
        // const contractSummary = response.text();
        // console.log(response.text());
        let parsedSummary = parseSummary(response.text());
        // console.log(parsedSummary);
        return parsedSummary.summary;
    }
});
exports.summarizeContract = summarizeContract;
const parseSummary = (inputString) => {
    const summaryMatch = inputString.match(/summary:\s*(.*)/i);
    const summary = summaryMatch
        ? summaryMatch[1].replace(/\*\*/g, "").trim()
        : null;
    return { summary };
};
const generateTwitterPost = (tokenData) => __awaiter(void 0, void 0, void 0, function* () {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    if (tokenData) {
        const tokenDataString = JSON.stringify(tokenData, null, 2);
        const finalPrompt = const_1.TWITTER_PROMPT + tokenDataString;
        console.log(finalPrompt);
        const result = yield model.generateContent(finalPrompt);
        const response = yield result.response;
        // const contractSummary = response.text();
        // console.log(response.text());
        let parsedPost = parsePost(response.text());
        // console.log(parsedSummary);
        return parsedPost.tweet;
    }
});
exports.generateTwitterPost = generateTwitterPost;
const parsePost = (inputString) => {
    const tweetMatch = inputString.match(/tweet:\s*(.*)/i);
    const tweet = tweetMatch ? tweetMatch[1].replace(/\*\*/g, "").trim() : null;
    return { tweet };
};
//# sourceMappingURL=gemini.js.map