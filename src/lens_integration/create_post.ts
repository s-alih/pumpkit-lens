import { textOnly } from "@lens-protocol/metadata";
import { client } from "./client";
import { storageClient } from "./storage-client";

// Function to create and post content on Lens
export async function postOnPumpkitLens(content: string) {
  try {
    // Step 1: Create Post Metadata
    const metadata = textOnly({
      content,
    });

    // Step 2: Upload Metadata to a Public URI
    const { uri } = await storageClient.uploadAsJson(metadata);
    console.log("Metadata URI:", uri);

    // Step 3: Submit On-Chain Post
    const result = await client.mutate({
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
      console.log(
        "Post created successfully! Transaction Hash:",
        response.hash
      );
      return { success: true, hash: response.hash };
    }

    if (response.reason) {
      console.error("Transaction failed:", response.reason);
      return { success: false, reason: response.reason };
    }

    return { success: false, message: "Unexpected response format." };
  } catch (error) {
    console.error("An error occurred while posting:", error);
    return { success: false, error };
  }
}
