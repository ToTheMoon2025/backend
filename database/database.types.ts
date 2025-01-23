export interface Database {
    public: {
        Tables: {
            NFTdata: {
                Row: {
                    token_address: string;
                    network: string;
                    token_id: string;
                    image: string;
                    sticker: string;
                }
                Insert: {
                    token_address: string;
                    network: string;
                    token_id: string;
                    image: string;
                    sticker: string;
                }
                Update: {
                    token_address: string;
                    network: string;
                    token_id: string;
                    image: string;
                    sticker: string;
                }
            },
            Users: {
                Row: {
                    user_id: string;
                    username: string;
                    wallet_address: string;
                    network: string;
                    created_at: string;
                }
                Insert: {
                    user_id: string;
                    username: string;
                    wallet_address: string;
                    network: string;
                    created_at: string;
                }
                Update: {
                    user_id: string;
                    username: string;
                    wallet_address: string;
                    network: string;
                    created_at: string;
                }
            }
        }
    }
};