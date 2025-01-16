import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Import your mintNFT function
import mintNFT from '../minting/mintNFT';

dotenv.config();
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define the request body type for TypeScript
interface MintNFTRequestBody {
    walletAddress: string;
    chain: string;
    metadata: JSON; // Adjust this type if you have a specific metadata schema
}

// Define the endpoint to call the mintNFT function
app.post('/mint-nft', async (req: Request, res: Response): Promise<any> => {
    const { walletAddress, chain, metadata } = req.body as MintNFTRequestBody;

    if (!walletAddress || !chain || !metadata) {
        return res.status(400).json({ error: "Missing required fields: walletAddress, chain, or metadata" });
    }

    try {
        const result = await mintNFT(walletAddress, chain, metadata);
        res.status(200).json({ success: true, data: result });
    } catch (error: any) {
        console.error("Error in /mint-nft:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
