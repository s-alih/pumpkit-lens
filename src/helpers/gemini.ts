import { TokenData } from "TokenData";
import { CONTRACT_PROMPT, TWITTER_PROMPT } from "../constants/const";

const { GoogleGenerativeAI } = require("@google/generative-ai");

export const summarizeContract = async (contractData: Array<string>) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  if (contractData) {
    const finalPrompt = CONTRACT_PROMPT + contractData;

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    // const contractSummary = response.text();
    // console.log(response.text());
    let parsedSummary = parseSummary(response.text());
    // console.log(parsedSummary);
    return parsedSummary.summary;
  }
};
const parseSummary = (inputString: string) => {
  const summaryMatch = inputString.match(/summary:\s*(.*)/i);

  const summary = summaryMatch
    ? summaryMatch[1].replace(/\*\*/g, "").trim()
    : null;

  return { summary };
};

export const generateTwitterPost = async (tokenData: TokenData) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  if (tokenData) {
    const tokenDataString = JSON.stringify(tokenData, null, 2);

    const finalPrompt = TWITTER_PROMPT + tokenDataString;
    console.log(finalPrompt);
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    // const contractSummary = response.text();
    // console.log(response.text());
    let parsedPost = parsePost(response.text());
    // console.log(parsedSummary);
    return parsedPost.tweet;
  }
};
const parsePost = (inputString: string) => {
  const tweetMatch = inputString.match(/tweet:\s*(.*)/i);

  const tweet = tweetMatch ? tweetMatch[1].replace(/\*\*/g, "").trim() : null;

  return { tweet };
};
