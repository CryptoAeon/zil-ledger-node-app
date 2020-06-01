const { Wallet } = require('@zilliqa-js/account/dist/wallet');

function addByMnemonic(seed, index) {
  const wallet = new Wallet('')

  wallet.addByMnemonic(seed, index)

  return wallet
}

function main() {
  const index = process.argv[2];
  const seed = process.argv[3];
  const wallet = addByMnemonic(seed, index)
  const account = JSON.stringify(wallet, null, 4)
  console.log(account)
}

main();
