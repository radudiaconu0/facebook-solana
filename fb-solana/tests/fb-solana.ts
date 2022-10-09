import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { FbSolana } from "../target/types/fb_solana";

describe("fb-solana", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.FbSolana as Program<FbSolana>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
