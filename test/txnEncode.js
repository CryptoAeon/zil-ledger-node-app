const txnEncoder = require('@zilliqa-js/account/dist/util').encodeTransactionProto;
const fs = require('fs');
const {BN, Long} = require('@zilliqa-js/util');
const chalk = require('chalk');

// [Usage: node txnEncode.js txn.jon]
if (process.argv.length != 3) {
  console.log("Usage: node txnEncode.js txn.json");
  process.exit(1);
}
ifile = process.argv[2];
console.log("Parsing file " + ifile);
txnParams = JSON.parse(fs.readFileSync(ifile, 'utf8'));

// Convert to Zilliqa types
if (!(txnParams.amount instanceof BN)) {
    txnParams.amount = new BN(txnParams.amount);
}
if (!(txnParams.gasPrice instanceof BN)) {
    txnParams.gasPrice = new BN(txnParams.gasPrice);
}
if (!(txnParams.gasLimit instanceof Long)) {
    txnParams.gasLimit = Long.fromNumber(txnParams.gasLimit);
}

// Encode the transaction.
const encodedTxn = txnEncoder(txnParams);
const message = JSON.stringify({"Protobuf Encoded transaction" : encodedTxn.toString('hex')}, null, 2);
console.log(chalk.green(message));
