"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TO_BLOCK = exports.FROM_BLOCK = exports.TWITTER_PROMPT = exports.CONTRACT_PROMPT = exports.API_BASE_URLS = void 0;
exports.API_BASE_URLS = {
    GOPLUS: "https://api.gopluslabs.io/api/v1/",
    GECKO: "https://api.geckoterminal.com/api/v2/",
    BASE_SCAN: "https://api.basescan.org/api",
};
exports.CONTRACT_PROMPT = `Give an array of smart contracts. All smart contract is linked to the same project. Your task is to generate a simple summary of the project that can be understood by a common person. The summary should only be 5-6 sentences long. The summary should include what the contract is doing and its core functionality along with any vulnerabilities or risks in the contract. 


The summary should be prefixed with summary: and should be followed by the summary of the contract in 5-6 sentences. For example, summary: This contract is a simple token contract that allows users to transfer tokens between each other. The contract has a vulnerability in the transfer function that allows users to transfer more tokens than they have. This vulnerability can be exploited by malicious users to drain the contract of all its funds.
`;
exports.TWITTER_PROMPT = `Given below is an object that contains data associated with a token (crypto). Assuming that your are a KOL, your task is to generate a informative tweet about the token that can be used to promote the token. The tweet should be engaging and should include only the key features of the token along with any risks or vulnerabilities associated with it. Do not just simply shill the token, Instead generate a tweet which will provide some information about the token. The tweet should be no more than 200 characters long (very important). Check the character count before returning the tweet. If the tweet is more than 200 characters, make it short to fit the character limit.
The tweet should be prefixed with tweet: and should be followed by the tweet about the token which is below 200 characters. 
`;
exports.FROM_BLOCK = "0x0";
exports.TO_BLOCK = "latest";
//# sourceMappingURL=const.js.map