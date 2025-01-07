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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const goplus_1 = require("./helpers/goplus");
const gecko_1 = require("./helpers/gecko");
const tokenHelpers_1 = require("./helpers/tokenHelpers");
const contract_1 = require("./helpers/contract");
const address_1 = require("./helpers/address");
const lens_1 = require("./helpers/lens"); // Import the Lens function
const twitter_1 = require("./helpers/twitter");
require("dotenv").config();
const app = (0, express_1.default)();
const port = 3000;
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
app.get("/token/getData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contractAddress = req.query.contractAddress;
        const chainId = Number(req.query.chainId);
        const [goPlusTokenData, geckoTokenData] = yield Promise.all([
            (0, goplus_1.getGoPlusData)(contractAddress, chainId),
            (0, gecko_1.getGeckoTokenData)(contractAddress, "base"),
        ]);
        const combinedData = (0, tokenHelpers_1.combineTokenData)(goPlusTokenData, geckoTokenData);
        const twitterContent = yield generateTwitterPost(combinedData);
        const tweetId = yield (0, twitter_1.postTweet)(twitterContent);
        res.send({ tweetId });
    }
    catch (e) {
        console.error("Error fetching token data", e);
        res.status(500).send("Internal Server Error");
    }
}));
app.get("/contract/summary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contractAddress = req.query.contractAddress;
        const contractSummary = yield (0, contract_1.fetchAndSummarizeContract)(contractAddress);
        res.send(contractSummary);
    }
    catch (e) {
        console.error("Error fetching contract summary", e);
        res.status(500).send("Internal Server Error");
    }
}));
app.get("/address/sentToken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = req.query.address;
        const deployedContracts = yield (0, address_1.getDeployedContracts)(address);
        res.send({ deployedContracts });
    }
    catch (e) {
        console.error("Error fetching address data", e);
        res.status(500).send("Internal Server Error");
    }
}));
// Lens Posting Endpoint
app.get("/lens/post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = req.query.content;
        if (!content) {
            return res.status(400).send("Content is required");
        }
        const lensResponse = yield (0, lens_1.postOnPumpkitLens)(content);
        if (lensResponse.success) {
            res.send({
                message: "Post created successfully!",
                hash: lensResponse.hash,
            });
        }
        else {
            res.status(500).send({
                message: "Failed to create post",
                error: lensResponse.error || lensResponse.reason,
            });
        }
    }
    catch (error) {
        console.error("Error creating Lens post", error);
        res.status(500).send("Internal Server Error");
    }
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map