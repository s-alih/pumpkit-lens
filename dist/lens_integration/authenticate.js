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
exports.client = void 0;
exports.loginToLens = loginToLens;
exports.resumeSession = resumeSession;
exports.verifyLensIDToken = verifyLensIDToken;
// src/authentication.ts
const client_1 = require("@lens-protocol/client");
const accounts_1 = require("viem/accounts");
const cookies_next_1 = require("cookies-next");
const jose_1 = require("jose");
// Set up the signer using a private key from environment variables
const signer = (0, accounts_1.privateKeyToAccount)(process.env.APP_PRIVATE_KEY || "");
// Define a custom storage provider using cookies for session persistence
const cookieStorage = {
    getItem(key) {
        return (0, cookies_next_1.getCookie)(key) || null;
    },
    setItem(key, value) {
        (0, cookies_next_1.setCookie)(key, value);
    },
    removeItem(key) {
        (0, cookies_next_1.deleteCookie)(key);
    },
};
// Create the Lens PublicClient instance
exports.client = client_1.PublicClient.create({
    environment: client_1.testnet,
    storage: cookieStorage,
});
// Log in to Lens API
function loginToLens() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authenticated = yield exports.client.login({
                onboardingUser: {
                    app: process.env.TESTNET_APP_ADDRESS ||
                        "0xe5439696f4057aF073c0FB2dc6e5e755392922e1",
                    wallet: signer.address,
                },
                signMessage: (message) => signer.signMessage({ message }),
            });
            if (authenticated.isErr()) {
                console.error("Login failed:", authenticated.error);
                return null;
            }
            return authenticated.value;
        }
        catch (error) {
            console.error("Error logging in:", error);
            return null;
        }
    });
}
// Resume a session
function resumeSession() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resumed = yield exports.client.resumeSession();
            if (resumed.isErr()) {
                console.error("Resuming session failed:", resumed.error);
                return null;
            }
            return resumed.value;
        }
        catch (error) {
            console.error("Error resuming session:", error);
            return null;
        }
    });
}
// Verify Lens ID Token
function verifyLensIDToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jwksUri = process.env.NEXT_PUBLIC_JWKS_URI ||
                "https://api.testnet.lens.dev/.well-known/jwks.json";
            const JWKS = (0, jose_1.createRemoteJWKSet)(new URL(jwksUri));
            const { payload } = yield (0, jose_1.jwtVerify)(token, JWKS);
            return payload;
        }
        catch (error) {
            console.error("Token verification failed:", error);
            return null;
        }
    });
}
// Example usage of authentication
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Attempt to resume a session
    let session = yield resumeSession();
    // If no session exists, log in
    if (!session) {
        session = yield loginToLens();
    }
    if (session) {
        console.log("Authenticated successfully:", session);
        // Example: Get current session details
        const result = yield exports.client.currentSession();
        if (result.isOk()) {
            console.log("Current session:", result.value);
        }
        // Example: Verifying a token
        const token = (0, cookies_next_1.getCookie)("LensIDToken");
        if (token) {
            const verifiedPayload = yield verifyLensIDToken(token);
            console.log("Verified token payload:", verifiedPayload);
        }
    }
    else {
        console.error("Authentication failed");
    }
}))();
//# sourceMappingURL=authenticate.js.map