# 🚀 **What is Pumpkit?**

Pumpkit decentralizes KOL benefits by introducing ecosystem agents that leverage token-driven AI to actively engage and grow Web3 communities. This framework bridges the gap between project founders, token holders, and participants, ensuring equal opportunities for everyone to contribute and benefit.

Key highlights:
- AI-powered campaign management.
- Distribution of KOL-like influence to all token holders.
- Revenue sharing among token holders.

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



