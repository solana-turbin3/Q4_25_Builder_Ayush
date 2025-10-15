import bs58 from "bs58";

/**
 * Convert a number[] or Uint8Array to Phantom private key string (Base58).
 * Phantom/solana CLI often expects a Base58-encoded secretKey.
 */
export function arrayToPhantomKey(input: number[] | Uint8Array): string {
  const u8 = input instanceof Uint8Array ? input : Uint8Array.from(input);
  return bs58.encode(Buffer.from(u8));
}

/**
 * Convert a Phantom private key string (Base58) back to number[].
 */
export function phantomKeyToArray(key: string): number[] {
  const buf = bs58.decode(key);
  return Array.from(buf);
}

/**
 * Convenience: check length and warn. Phantom commonly uses a 64-byte secretKey
 * (32-byte secret + 32-byte pubkey) or a 32-byte seed. This function will return
 * the decoded array and its length so you can inspect.
 */
export function decodeAndInspect(key: string): {
  bytes: number[];
  length: number;
} {
  const bytes = phantomKeyToArray(key);
  return { bytes, length: bytes.length };
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const phantom = arrayToPhantomKey(arr);
console.log("Phantom key (base58):", phantom);

const back = phantomKeyToArray(phantom);
console.log("Back to array:", back);
