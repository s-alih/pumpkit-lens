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
exports.postOnPumpkitLens = postOnPumpkitLens;
const metadata_1 = require("@lens-protocol/metadata");
const client_1 = require("./client");
const storage_client_1 = require("./storage-client");
// Function to create and post content on Lens
function postOnPumpkitLens(content) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Step 1: Create Post Metadata
            const metadata = (0, metadata_1.textOnly)({
                content,
            });
            // Step 2: Upload Metadata to a Public URI
            const { uri } = yield storage_client_1.storageClient.uploadAsJson(metadata);
            console.log("Metadata URI:", uri);
            // Step 3: Submit On-Chain Post
            const result = yield client_1.client.mutate({
                mutation: `
        mutation Post($request: PostRequest!) {
          post(request: $request) {
            ... on PostResponse {
              hash
            }
            ... on SponsoredTransactionRequest {
              ...SponsoredTransactionRequest
            }
            ... on SelfFundedTransactionRequest {
              ...SelfFundedTransactionRequest
            }
            ... on TransactionWillFail {
              reason
            }
          }
        }
      `,
                variables: {
                    request: {
                        contentUri: uri,
                    },
                },
            });
            // Handle result
            if (result.errors) {
                console.error("Error creating post:", result.errors);
                return { success: false, error: result.errors };
            }
            const response = result.data.post;
            if (response.hash) {
                console.log("Post created successfully! Transaction Hash:", response.hash);
                return { success: true, hash: response.hash };
            }
            if (response.reason) {
                console.error("Transaction failed:", response.reason);
                return { success: false, reason: response.reason };
            }
            return { success: false, message: "Unexpected response format." };
        }
        catch (error) {
            console.error("An error occurred while posting:", error);
            return { success: false, error };
        }
    });
}
//# sourceMappingURL=create_post.js.map