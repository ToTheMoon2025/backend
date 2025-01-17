const dotenv = require('dotenv');

dotenv.config();
const apiKey = process.env.CROSSMINT_API;
const env = "staging"; // or "www" for production

interface METADATA {
    name: string;
    description: string;
    image: string;
}

async function mintNFT(walletAddress: string, chain: string, metadata: METADATA): Promise<any> {
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

// // Test the mintNFT function
// (async () => {
//     try {
//         const walletAddress = "2i9LB2Dg3MPqQmQ5w9aNr874BYSaAo73Qg7yyzemBF2o"; // Replace with a valid wallet address
//         const chain = "solana"; // Replace with the target chain, e.g., "ethereum" or "polygon"
//         const metadata = {
//             name: "Test NFT",
//             description: "This is a test NFT",
//             image: "https://s.abcnews.com/images/US/donald-trump-1-epa-gmh-250116_1737051836011_hpMain_3x2_992.jpg"
//         };

//         const result = await mintNFT(walletAddress, chain, metadata);
//         console.log("NFT successfully created:", result);
//     } catch (error) {
//         console.error("Test failed:", error);
//     }
// })();