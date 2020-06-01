const readline = require('readline');
const { Wallet } = require('@zilliqa-js/a');

function addByMnemonic() {
  const wallet = new Wallet('')

  wallet.addByMnemonic(seed, index)

  return wallet
}

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  // const account = JSON.stringify(wallet, null, 4)
}
