import { GoogleGenerativeAI } from "@google/generative-ai";

// Create a new instance of GoogleGenerativeAI with the current API key
function createGenAIInstance(): GoogleGenerativeAI {
  const apiKey = "AIzaSyA0nnPK11pJKS5myavpEieLnDooDpC4PJM";
  return new GoogleGenerativeAI(apiKey);
}

// Interface for the distribution decision
interface DistributionDecision {
  shouldDistribute: boolean;
  stages: number;
  recipients: string[];
  distributionPlan: {
    stage: number;
    tokens: string;
    condition: string;
  }[];
}

export async function analyzeTweetData(
  tweetData: any,
  amount: string
): Promise<DistributionDecision> {
  const genAI = createGenAIInstance();
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Generate a prompt for AI analysis
  const prompt = `
      Analyze the following Twitter data and decide if token distribution should occur. Provide detailed reasoning:
      ${JSON.stringify(
        tweetData,
        null,
        2
      )} and returning the distribution plan of tokens to distribute the total amount of ${amount}
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

  const result = await model.generateContent(prompt);

  const modelResponse = result.response?.text();
  const firstIndex = modelResponse?.indexOf("{");
  const lastIndex = modelResponse?.lastIndexOf("}");
  const response = modelResponse?.substring(firstIndex, lastIndex + 1);

  // Parse the response and ensure it matches the interface
  console.log("AI Analysis Result:", result.response?.text());
  const distributionDecision: DistributionDecision = JSON.parse(
    response || "{}"
  );

  return distributionDecision;
}
