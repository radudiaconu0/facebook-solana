import { useAnchorWallet, useWallet } from "solana-wallets-vue";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { SOLANA_HOST } from "~~/utils/const";
const commitment = 'confirmed'
const connection = new Connection(SOLANA_HOST, commitment)

export default async function useWalletBalance(): Promise<number> {
    const wallet = useAnchorWallet();
    if (wallet.value) {
        const lamports = await connection.getBalance(wallet.value.publicKey);
        const balance = ref(lamports / LAMPORTS_PER_SOL);
        return balance.value;
    }
    return 0.0;
}