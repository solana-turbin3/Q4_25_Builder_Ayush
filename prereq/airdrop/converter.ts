import bs58 from 'bs58';
import prompt from 'prompt-sync';
import x from './dev-wallet.json'
// Convert Phantom base58 to byte array
function base58ToWallet() {
  const input = 'enter phantom private key';
  const walletBytes = bs58.decode(input);
  console.log("Wallet bytes:", walletBytes);
}

// Convert byte array to Phantom base58
function walletToBase58() {
  // Example byte array (from dev-wallet.json)
  const wallet = Uint8Array.from('x');
  const base58Key = bs58.encode(wallet);
  console.log("Base58 key:", base58Key);
}
// walletToBase58();
// walletToBase58();
base58ToWallet();
