## submit_rs

The `submit_rs` instruction is the main step for finishing the Rust prerequisite.  
Here’s what actually happens and how I built it:

- **Program**: `TRBZyQHB3m68FGeVsqTK39Wm4xejadjVhP5MAZaKWDM` (the prereq program on devnet).
- **Discriminator**: every instruction in Anchor has an 8-byte tag. For `submit_rs` it is:

```

[77, 124, 82, 163, 21, 133, 181, 206]

```

This is the only data sent with the instruction.

### Accounts it expects

The order of accounts matters a lot:

1. **user** – my Turbin3 wallet, signer + writable
2. **account** – the prereq PDA created earlier with seeds `[ "prereqs", user ]`, writable
3. **mint** – a new mint keypair for the NFT, signer + writable
4. **collection** – the collection address they gave us, writable
5. **authority** – PDA derived from `[ "collection", collection ]`, readonly
6. **mpl_core_program** – Metaplex Core program, readonly
7. **system_program** – Solana system program, readonly

Both **my wallet** and the **mint keypair** have to sign the transaction. If the mint is missing as a signer, the program will reject it.

### What it does

When the transaction goes through:

- It checks that my `ApplicationAccount` already has the TypeScript prereq set (`pre_req_ts = true`).
- It mints a new NFT into the given collection.
- It flips the Rust flag inside my `ApplicationAccount` (`pre_req_rs = true`).

This means that success isn’t just seeing a mint appear. The real check is whether the PDA account data now shows both `pre_req_ts = true` and `pre_req_rs = true`.
