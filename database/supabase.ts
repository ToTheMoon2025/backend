import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
const dotenv = require('dotenv');
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_API = process.env.SUPABASE_API as string;

const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_API
);

async function select() {
  const { data, error } = await supabase
    .from('NFTdata')
    .select('*');
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  };
};

async function insert_row(token_address: string, network: string, token_id: string) {
  const { data, error } = await supabase
    .from('NFTdata')
    .insert([
      {
        token_address: token_address, 
        network: network, 
        token_id: token_id,
        image: "link.com",
        sticker: null,
      },
    ]).select();
  if(error) {
    console.log(error);
  } else {
    console.log(data);
  }
};
  
async function delete_matching_row(token_address: string, network: string) {
  const { data, error } = await supabase
    .from('NFTdata')
    .delete()
    .eq('token_address', token_address)
    .eq('network', network)
    .select();
  if(error) {
    console.log(error);
  } else {
    console.log(data);
  }
};

async function insert_user(username: string, wallet_address: string, network: string) {
  const { data, error } = await supabase
    .from('Users')
    .insert([
      {
        username: username,
        wallet_address: wallet_address,
        network: network,
      },
    ]).select();
  if(error) {
    console.log(error);
  } else {
    console.log(data);
  }
}

async function delete_user(wallet_address: string) {
  const { data, error } = await supabase
    .from('Users')
    .delete()
    .eq('wallet_address', wallet_address)
    .select();
  if(error) {
    console.log(error);
  } else {
    console.log(data);
  }
};

async function select_images_from_token_address(token_address: string, network: string) {
  const { data, error } = await supabase
    .from('NFTdata')
    .select('stickers')
    .eq('token_address', token_address)
    .eq('network', network);
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  };
};

export { select, insert_row, delete_matching_row, insert_user, delete_user, select_images_from_token_address};
