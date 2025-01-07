import { API_BASE_URLS } from "../constants/const";
import { summarizeContract } from "./gemini";

export const fetchAndSummarizeContract = async (address: string) => {
  try {

    const queryString = `?module=contract&action=getsourcecode&address=${address}&apiKey=${process.env.BASESCAN_API_KEY}`;
    const url = `${API_BASE_URLS.BASE_SCAN}${queryString}`;

    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    if (data.status === "1") {
      const contracts = [];
      for (let i = 0; i < data.result.length; i++) {
        // Extract source code from the first result
        // console.log(data.result[i].SourceCode);
        contracts.push(data.result[i].SourceCode);
      }
    //   console.log(contracts);
      const summary = await summarizeContract(contracts);
      return summary;
    }
  } catch (error: any) {
    console.error("Error fetching contract:", error.message);
    throw error;
  }
};
