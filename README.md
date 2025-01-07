# Pumpkit

**Empowering Ecosystem Agents with Token-Driven Influence**

Pumpkit is an AI-powered framework designed to transform the traditional KOL (Key Opinion Leader) model in Web3 and meme ecosystems. It allows projects to create customized ecosystem agents that manage and promote campaigns using token data while enabling community-driven KOL influence.

---

## 🚀 **Why we need Pumpkit?**

Pumpkit decentralizes KOL benefits by introducing ecosystem agents that leverage token-driven AI to actively engage and grow Web3 communities. This framework bridges the gap between project founders, token holders, and participants, ensuring equal opportunities for everyone to contribute and benefit.

Key highlights:
- AI-powered campaign management.
- Distribution of KOL-like influence to all token holders.
- Revenue sharing among token holders.

---

## 🎯 **Problem Statement**

Traditional KOL models face several challenges:
1. Centralized control over promotions and token influence.
2. High barriers for new users to access KOL benefits.
3. Limited opportunities for participants to actively contribute or gain value.

Pumpkit solves these challenges by decentralizing the KOL system and empowering communities.

---

## 🛠️ **How Pumpkit Works**

1. **Ecosystem Agents:**  
   Ecosystem agents are AI-driven entities created using Pumpkit. Each agent is assigned a dedicated wallet to manage campaigns and distribute benefits.

2. **Campaign Flow:**  
   - **Token Submission:** Participants send project tokens to the agent’s wallet to initiate campaigns.
   - **Token-Driven Content:** The agent posts on lens, updates, and events based on token contributions and trusted sources.
   - **Weighted Strategy:** Larger token contributions lead to more prioritized updates.

3. **Revenue Sharing:**  
   Tokens received by agents are distributed proportionally among Pumpkit token holders, providing a sustainable incentive for community participation.

---

## 🌟 **Key Features**

- **Campaign Initiation:**  
  Ecosystem participants can start campaigns by sending project tokens to an agent’s wallet.

- **Token-Driven Content:**  
  Agents post content on lens and updates based on token data.

- **Wallet Association:**  
  Every agent is linked to a dedicated wallet for streamlined campaign management.

- **Weighted Content Strategy:**  
  The frequency and prioritization of content are influenced by token contributions.

---

## 🌍 **Vision**

Pumpkit aims to democratize KOL-like influence and make it accessible to everyone. Its decentralized framework allows project founders, token holders, and ecosystem participants to:
- Share equal benefits from KOL activities.
- Actively participate in the growth of their ecosystem.
- Contribute to a more inclusive and decentralized Web3 space.

---

## 📈 **Tokenomics**

- **Pumpkit Token ($PMPK):**  
  The utility token for the Pumpkit ecosystem, available for purchase and trade.

- **Revenue Sharing:**  
  A portion of tokens received by agents is distributed to Pumpkit token holders, ensuring a fair and transparent system for all participants.

---

## 📋 **API Endpoints**


### 2. **Get Token Data**
- **Endpoint:** `GET /token/sendToken`  
- **Query Parameters:**
  - `contractAddress` (string, required): The token's contract address.
  - `chainId` (number, required): The blockchain ID.  
- **Description:** Fetches token data from GoPlus and Gecko APIs, combines the data, and posts on lens.  
- **Response:**
  ```json
  {
    "post_sent": true
  }
  ```

---

### 3. **Fetch Contract Summary**
- **Endpoint:** `GET /contract/summary`  
- **Query Parameters:**
  - `contractAddress` (string, required): The contract's address.  
- **Description:** Fetches and summarizes smart contract details.  
- **Response:** A JSON object containing the contract summary.

---

### 4. **Get Deployed Contracts**
- **Endpoint:** `GET /address/getData`  
- **Query Parameters:**
  - `address` (string, required): The Ethereum address.  
- **Description:** Retrieves contracts deployed by the specified address.  
- **Response:**
  ```json
  {
    "deployedContracts": ["0x1234...", "0x5678..."]
  }
  ```

---

### 5. **Post on Lens Protocol**
- **Endpoint:** `GET /lens/post`  
- **Query Parameters:**
  - `content` (string, required): The content to post on Lens.  
- **Description:** Posts the specified content to the Lens Protocol.  
- **Response (Success):**
  ```json
  {
    "message": "Post created successfully!",
  }
  ```
- **Response (Failure):**
  ```json
  {
    "message": "Failed to create post",
    "error": "Error message or reason"
  }
  ```

## Screenshot

![868dd71e-4327-49e2-bfb4-6543c41cce85](https://github.com/user-attachments/assets/90e8ea16-a47f-45f0-9a74-415fd78e6bfb)

![c0e8a78e-016f-4032-b2d3-ae2de4001d60](https://github.com/user-attachments/assets/c4b3dcfa-87c4-4ecb-bcd5-6d694df94be9)


## Source Code
https://github.com/s-alih/pumpkit-lens

## Presentation
https://drive.google.com/file/d/1Qx6fVKEx33A3WQmcOCFB69z9dZlRBaha/view?usp=sharing



