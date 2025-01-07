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
exports.fetchAndSummarizeContract = void 0;
const const_1 = require("../constants/const");
const gemini_1 = require("./gemini");
const fetchAndSummarizeContract = (address) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryString = `?module=contract&action=getsourcecode&address=${address}&apiKey=${process.env.BASESCAN_API_KEY}`;
        const url = `${const_1.API_BASE_URLS.BASE_SCAN}${queryString}`;
        const response = yield fetch(url);
        const data = yield response.json();
        // console.log(data);
        if (data.status === "1") {
            const contracts = [];
            for (let i = 0; i < data.result.length; i++) {
                // Extract source code from the first result
                // console.log(data.result[i].SourceCode);
                contracts.push(data.result[i].SourceCode);
            }
            //   console.log(contracts);
            const summary = yield (0, gemini_1.summarizeContract)(contracts);
            return summary;
        }
    }
    catch (error) {
        console.error("Error fetching contract:", error.message);
        throw error;
    }
});
exports.fetchAndSummarizeContract = fetchAndSummarizeContract;
//# sourceMappingURL=contract.js.map