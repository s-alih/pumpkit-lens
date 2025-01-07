import { TO_BLOCK, FROM_BLOCK } from "../constants/const";

const { Alchemy, Utils, Network } = require("alchemy-sdk");

  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.BASE_MAINNET,
  };

 const alchemy = new Alchemy(settings);
export const getDeployedContracts = async (address: string) => {
  const transfers = [];

//   console.log(process.env.ALCHEMY_API_KEY);
 
//   console.log(settings);
  let response = await alchemy.core.getAssetTransfers({
    fromBlock: FROM_BLOCK,
    toBlock: TO_BLOCK,
    fromAddress: address,
    excludeZeroValue: false,
    category: ["external"],
  });
  console.log(response);
  transfers.push(...response.transfers);

  while (response.pageKey) {
    let pageKey = response.pageKey;
    response = await alchemy.core.getAssetTransfers({
      fromBlock: FROM_BLOCK,
      toBlock: TO_BLOCK,
      fromAddress: address,
      excludeZeroValue: false,
      category: ["external"],
      pageKey: pageKey,
    });
    transfers.push(...response.transfers);
  }

  const deployments = transfers.filter((transfer) => transfer.to === null);
  const txHashes = deployments.map((deployment) => deployment.hash);

  const promises = txHashes.map((hash) =>
    alchemy.core.getTransactionReceipt(hash)
  );

  const receipts = await Promise.all(promises);
  const contractAddresses = receipts.map((receipt) => receipt?.contractAddress);
  // console.log(contractAddresses);
  return { contractAddresses };
};
export const getTokenBalances = async (address: string) => {
  const balances = await alchemy.core.getTokenBalances(address);

  const nonZeroBalances = balances.tokenBalances.filter((token: any) => {
    return (
      token.tokenBalance !==
      "0x0000000000000000000000000000000000000000000000000000000000000000"
    );
  });

  const tokenBalanceList = [];

  let i = 1;

  for (let token of nonZeroBalances) {
    let balance = token.tokenBalance;

    const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

    balance = balance / Math.pow(10, metadata.decimals);
    balance = balance.toFixed(2);

    tokenBalanceList.push({
      name: metadata.name,
      balance: balance,
      symbol: metadata.symbol,
    });
    // console.log("fetching");
  }

  return { tokenBalanceList };
};
