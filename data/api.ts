const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


const mintNFT = require('../minting/mintNFT').default; // Adjust the path as needed

dotenv.config();
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define the endpoint to call the mintNFT function
import { Request, Response } from 'express';

app.post('/mint-nft', async (req: Request, res: Response) => {
    const { walletAddress, chain, metadata } = req.body;

    if (!walletAddress || !chain || !metadata) {
        return res.status(400).json({ error: "Missing required fields: walletAddress, chain, or metadata" });
    }

    try {
        const result = await mintNFT(walletAddress, chain, metadata);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in /mint-nft:", error.message);
        } else {
            console.error("Error in /mint-nft:", error);
        }
        res.status(500).json({ success: false, error: (error as Error).message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
