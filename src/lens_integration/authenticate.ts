// src/authentication.ts
import { PublicClient, SessionClient, testnet } from "@lens-protocol/client";
import { privateKeyToAccount } from "viem/accounts";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { jwtVerify, createRemoteJWKSet } from "jose";

// Set up the signer using a private key from environment variables
const signer = privateKeyToAccount(process.env.APP_PRIVATE_KEY || "");

// Define a custom storage provider using cookies for session persistence
const cookieStorage = {
  getItem(key: string) {
    return getCookie(key) || null;
  },
  setItem(key: string, value: string) {
    setCookie(key, value);
  },
  removeItem(key: string) {
    deleteCookie(key);
  },
};

// Create the Lens PublicClient instance
export const client = PublicClient.create({
  environment: testnet,
  storage: cookieStorage,
});

// Log in to Lens API
export async function loginToLens(): Promise<SessionClient | null> {
  try {
    const authenticated = await client.login({
      onboardingUser: {
        app:
          process.env.TESTNET_APP_ADDRESS ||
          "0xe5439696f4057aF073c0FB2dc6e5e755392922e1",
        wallet: signer.address,
      },
      signMessage: (message: string) => signer.signMessage({ message }),
    });

    if (authenticated.isErr()) {
      console.error("Login failed:", authenticated.error);
      return null;
    }

    return authenticated.value;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
}

// Resume a session
export async function resumeSession(): Promise<SessionClient | null> {
  try {
    const resumed = await client.resumeSession();
    if (resumed.isErr()) {
      console.error("Resuming session failed:", resumed.error);
      return null;
    }

    return resumed.value;
  } catch (error) {
    console.error("Error resuming session:", error);
    return null;
  }
}

// Verify Lens ID Token
export async function verifyLensIDToken(token: string): Promise<any | null> {
  try {
    const jwksUri =
      process.env.NEXT_PUBLIC_JWKS_URI ||
      "https://api.testnet.lens.dev/.well-known/jwks.json";
    const JWKS = createRemoteJWKSet(new URL(jwksUri));

    const { payload } = await jwtVerify(token, JWKS);
    return payload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

// Example usage of authentication
(async () => {
  // Attempt to resume a session
  let session = await resumeSession();

  // If no session exists, log in
  if (!session) {
    session = await loginToLens();
  }

  if (session) {
    console.log("Authenticated successfully:", session);

    // Example: Get current session details
    const result = await client.currentSession();
    if (result.isOk()) {
      console.log("Current session:", result.value);
    }

    // Example: Verifying a token
    const token = getCookie("LensIDToken");
    if (token) {
      const verifiedPayload = await verifyLensIDToken(token as string);
      console.log("Verified token payload:", verifiedPayload);
    }
  } else {
    console.error("Authentication failed");
  }
})();
