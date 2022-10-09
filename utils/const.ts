import { AnchorError } from "@project-serum/anchor";
import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import { Idl } from "@project-serum/anchor";
import facebook_sol from "./facebook_clone.json";

export const CLUSTER = 'devnet'
export const SOLANA_HOST = clusterApiUrl(CLUSTER)
export const STABLE_POOL_PROGRAM_ID = new PublicKey(
    "6Y6fezwG7zywo4srsARzVk172JZzgtC75QHYjYd9BFwq"
)
export const STABLE_POOL_IDL: any = facebook_sol