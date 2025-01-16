const dotenv = require('dotenv');

dotenv.config();
const apiKey = process.env.CROSSMINT_API;
const env = "staging"; // or "www" for production

async function mintNFT(walletAddress: string, chain: string, metadata: JSON): Promise<any> {
    const recipientAddress = `${chain}:${walletAddress}`;
    const url = `https://${env}.crossmint.com/api/2022-06-09/collections/default/nfts`;
    if (!apiKey) {
        throw new Error("CROSSMINT_API is not defined");
    }
    const options = {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-api-key": apiKey,
        },
        body: JSON.stringify({
            recipient: recipientAddress,
            metadata: metadata,
        }),
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Failed to create NFT: ${response.status} ${response.statusText} - ${errorDetails}`);
        }
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error creating NFT:", error);
        throw error;
    }
};

export default mintNFT;