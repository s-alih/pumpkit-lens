import express from "express";
import axios from "axios";
import { getGoPlusData } from "./helpers/goplus";
import { TokenData } from "TokenData";
import { getGeckoTokenData } from "./helpers/gecko";
import { combineTokenData } from "./helpers/tokenHelpers";
import { fetchAndSummarizeContract } from "./helpers/contract";
import { getDeployedContracts } from "./helpers/address";
import { postOnPumpkitLens } from "./helpers/lens"; // Import the Lens function
import { postTweet } from "./helpers/twitter";
require("dotenv").config();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/token/getData", async (req, res) => {
  try {
    const contractAddress = req.query.contractAddress as string;
    const chainId = Number(req.query.chainId as string);

    const [goPlusTokenData, geckoTokenData] = await Promise.all([
      getGoPlusData(contractAddress, chainId),
      getGeckoTokenData(contractAddress, "base"),
    ]);
    const combinedData = combineTokenData(goPlusTokenData, geckoTokenData);
    const twitterContent = await generateTwitterPost(combinedData);
    const tweetId = await postTweet(twitterContent);

    res.send({ tweetId });
  } catch (e) {
    console.error("Error fetching token data", e);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/contract/summary", async (req, res) => {
  try {
    const contractAddress = req.query.contractAddress as string;
    const contractSummary = await fetchAndSummarizeContract(contractAddress);

    res.send(contractSummary);
  } catch (e) {
    console.error("Error fetching contract summary", e);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/address/sentToken", async (req, res) => {
  try {
    const address = req.query.address as string;
    const deployedContracts = await getDeployedContracts(address);

    res.send({ deployedContracts });
  } catch (e) {
    console.error("Error fetching address data", e);
    res.status(500).send("Internal Server Error");
  }
});

// Lens Posting Endpoint
app.get("/lens/post", async (req, res) => {
  try {
    const content = req.query.content as string;

    if (!content) {
      return res.status(400).send("Content is required");
    }

    const lensResponse = await postOnPumpkitLens(content);

    if (lensResponse.success) {
      res.send({
        message: "Post created successfully!",
        hash: lensResponse.hash,
      });
    } else {
      res.status(500).send({
        message: "Failed to create post",
        error: lensResponse.error || lensResponse.reason,
      });
    }
  } catch (error) {
    console.error("Error creating Lens post", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
