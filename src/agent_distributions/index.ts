// Filename: index.ts
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LIT_NETWORK, LIT_ABILITY, LIT_RPC } from "@lit-protocol/constants";
import { LitActionResource, LitPKPResource } from "@lit-protocol/auth-helpers";
import { LitContracts } from "@lit-protocol/contracts-sdk";
import { EthWalletProvider } from "@lit-protocol/lit-auth-client";
import * as ethers from "ethers";
import * as fs from "fs";
import path from "path";
import schedule from "node-schedule";
import { litActionCode } from "./litAction";
import { analyzeTweetData } from "./analayzeTweetData";

// Import AI model or library for analysis (e.g., TensorFlow.js or OpenAI)
//  Example AI analysis module

const { ETHEREUM_PRIVATE_KEY, CHAIN_RPC } = process.env;
const NETWORK = LIT_NETWORK.DatilDev;

// Filepath for PKP info and tweet data
const PKP_INFO_FILE = path.join(__dirname, "pkpInfo.json");
const TWEET_DATA_FILE = path.join(__dirname, "tweetData.json");

const recipients = [
  "0x1224D241f6D0400284A22470b2A8af9Ee6bE15E0",
  "0x97Aaa4c6b695A21B76E9720676D35099854E3868",
];

// Function to generate PKP
export const generatePKP = async () => {
  const litNodeClient = new LitNodeClient({
    litNetwork: NETWORK,
    debug: false,
  });

  try {
    const ethersWallet = new ethers.Wallet(
      ETHEREUM_PRIVATE_KEY!,
      new ethers.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
    );
    await litNodeClient.connect();

    const litContracts = new LitContracts({
      signer: ethersWallet,
      network: NETWORK,
      debug: false,
    });
    await litContracts.connect();

    // Mint PKP
    const pkp = (await litContracts.pkpNftContractUtils.write.mint()).pkp;

    console.log("PKP: ", pkp);

    // Authenticate with Lit
    const authMethod = await EthWalletProvider.authenticate({
      signer: ethersWallet,
      litNodeClient,
    });

    // Get PKP session signatures
    const pkpSessionSigs = await litNodeClient.getPkpSessionSigs({
      pkpPublicKey: pkp.publicKey!,
      chain: "ethereum",
      authMethods: [authMethod],
      resourceAbilityRequests: [
        {
          resource: new LitActionResource("*"),
          ability: LIT_ABILITY.LitActionExecution,
        },
        { resource: new LitPKPResource("*"), ability: LIT_ABILITY.PKPSigning },
      ],
    });

    console.log("PKP Generated Successfully!");

    return {
      pkp,
      pkpSessionSigs,
    };
  } catch (error) {
    console.error("Error generating PKP:", error);
    throw error;
  } finally {
    litNodeClient?.disconnect();
  }
};

// Function to distribute tokens based on AI analysis of tweet data
const distributeTokensWithAI = async (
  tokenAmount: string = "10",
  tokenAddress: string
) => {
  try {
    // Load PKP info
    if (!fs.existsSync(PKP_INFO_FILE)) {
      throw new Error("PKP Info file does not exist. Create the agent first.");
    }

    // await litNodeClient.connect();

    // Load Tweet Data
    if (!fs.existsSync(TWEET_DATA_FILE)) {
      throw new Error("Tweet data file does not exist.");
    }
    const tweetData = JSON.parse(fs.readFileSync(TWEET_DATA_FILE, "utf-8"));

    console.log("Loaded Tweet Data:", tweetData);

    // Analyze tweet data using AI
    const distributionDecision = await analyzeTweetData(tweetData, tokenAmount); // Returns a decision object
    console.log("AI Analysis Result:", distributionDecision);
    // console the result in readabel way
    console.log(
      "AI Analysis Result:",
      JSON.stringify(distributionDecision, null, 2)
    );

    // Check if distribution should happen
    if (!distributionDecision.shouldDistribute) {
      console.log("Distribution not required based on AI analysis.");
      return;
    }

    // // Calculate staged distribution
    // const totalAmount = ethers.utils.parseUnits(tokenAmount, 18); // Example total amount to distribute
    const stages = distributionDecision.stages || 3;
    // // const stages = 1;
    // const stageAmount = totalAmount.div(stages);

    const pkpInfo = JSON.parse(fs.readFileSync(PKP_INFO_FILE, "utf-8"));

    const { pkp, pkpSessionSigs } = pkpInfo;

    const litNodeClient = new LitNodeClient({
      litNetwork: NETWORK,
      debug: false,
    });

    await litNodeClient.connect();

    const ethersWallet = new ethers.Wallet(
      ETHEREUM_PRIVATE_KEY!,
      new ethers.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
    );

    const litContracts = new LitContracts({
      signer: ethersWallet,
      network: NETWORK,
      debug: false,
    });
    await litContracts.connect();

    for (let stage = 1; stage <= stages; stage++) {
      const stageAmount = ethers.utils.parseUnits(
        distributionDecision.distributionPlan[stage - 1].tokens.toString(),
        18
      );
      console.log(
        `Distributing ${ethers.utils.formatUnits(
          stageAmount,
          18
        )} tokens in ${stages} stages.`
      );
      const stageDate = new Date();
      stageDate.setDate(stageDate.getDate() + stage * 30); // Calculate stage date (30, 60, 90 days, etc.)

      console.log(
        `Scheduling stage ${stage} to run at: ${stageDate.toISOString()}`
      );

      schedule.scheduleJob(stageDate, async () => {
        console.log(`Starting distribution stage ${stage}...`);

        try {
          const result = await litNodeClient.executeJs({
            sessionSigs: pkpSessionSigs,
            code: litActionCode,
            jsParams: {
              publicKey: pkp.publicKey!,
              privatKey: ETHEREUM_PRIVATE_KEY,
              chainRPC: CHAIN_RPC,
              amount: ethers.utils.formatUnits(stageAmount, 18),
              // recipients: distributionDecision.recipients, // Recipients from AI analysis
              recipients: recipients,
              tokenAddress,
              tokenABI: [
                "function transfer(address to, uint amount) public returns (bool)",
              ],
            },
          });
          // console.log(`Stage ${stage} distribution complete. Result:`, result);
        } catch (error) {
          console.error(`Error in stage ${stage} distribution:`, error);
        }
      });
    }

    console.log("Token distribution completed.");
  } catch (error) {
    console.error("Error distributing tokens:", error);
  }
};

// async function getRecipientsFromFile(filePath: string): Promise<string[]> {
//   try {
//     const fileContent = await fs.readFile(filePath, "utf8");

//     const data = JSON.parse(fileContent);
//     if (data.recipients && Array.isArray(data.recipients)) {
//       return data.recipients;
//     } else {
//       throw new Error("Invalid recipients format in file.");
//     }
//   } catch (error) {
//     console.error("Error reading recipients from file:", error);
//     throw error;
//   }
// }

function scheduleJobForTenDaysLater(): void {
  // Calculate the date and time 10 days from now
  const runDate = new Date();
  runDate.setDate(runDate.getDate() + 10);

  console.log(`Job scheduled to run at: ${runDate.toISOString()}`);

  // Schedule the job using node-schedule
  schedule.scheduleJob(runDate, () => {
    distributeTokensWithAI(
      "1000",
      "0xa16302dBFD70c65a25E797ae41B3306E6E102eaF"
    );
  });
}

// distributeTokensWithAI("20", "0xa16302dBFD70c65a25E797ae41B3306E6E102eaF");

scheduleJobForTenDaysLater();
// // Execute functions
// (async () => {
//   await generatePKP();
//   await distributeTokensWithAI();
// })();

// create
