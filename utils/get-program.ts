import { computed } from 'vue'
import { useAnchorWallet } from 'solana-wallets-vue'
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js'
import { AnchorProvider, Idl, Program } from '@project-serum/anchor'
import idl from '@/utils/facebook_clone.json'
import { SOLANA_HOST } from './const'
const commitment = 'confirmed'
const programID = new PublicKey(idl.metadata.address)
const workspace = null
export const useWorkspace = () => workspace

export const initWorkspace = () => {
  const wallet = useAnchorWallet()
  const connection = new Connection(SOLANA_HOST, commitment)
  console.log(idl.metadata.address)
  const provider = computed(() => new AnchorProvider(connection, wallet.value, AnchorProvider.defaultOptions()))
  const program = computed(() => new Program(idl as Idl, programID, provider.value))

  return {
    wallet,
    connection,
    provider,
    program,
  }
}