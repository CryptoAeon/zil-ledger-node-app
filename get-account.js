const { Wallet } = require('@zilliqa-js/account/dist/wallet');

function addByMnemonic(phrase, index) {
  const wallet = new Wallet('')

  if (!wallet.isValidMnemonic(phrase)) {
    throw new Error(`Invalid mnemonic phrase: ${phrase}`);
  }
  const seed = bip39.mnemonicToSeed(phrase);
  const hdKey = hdkey.fromMasterSeed(seed);
  const childKey = hdKey.derive(`m/44'/313'/0'/0/${index}`);
  const privateKey = childKey.privateKey.toString('hex');
  wallet.addByPrivateKey(privateKey);

  return wallet;
}

/**
 * show full account by mnemonic seed.
 * run:
 * node get-account.js 0 "mnemonic mnemonic etc..."
 */
function main() {
  const index = process.argv[2];
  const seed = process.argv[3];
  const wallet = addByMnemonic(seed, index)
  const account = JSON.stringify(wallet, null, 4)
  console.log(account)
}

main();
