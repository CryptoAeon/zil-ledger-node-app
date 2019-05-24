const txnEncoder = require('@zilliqa-js/account/dist/util').encodeTransactionProto;
const {BN, Long} = require('@zilliqa-js/util');
const {compressPublicKey} = require('@zilliqa-js/crypto/dist/util');
const chalk = require('chalk');

const CLA = 0xe0;
const INS = {
    "getVersion": 0x01,
    "getPublickKey": 0x02,
    "getPublicAddress": 0x02,
    "signHash": 0x04,
    "signTxn": 0x08
};

const PubKeyByteLen = 33;
const AddrByteLen = 20;
const SigByteLen = 64;
const HashByteLen = 32;
// https://github.com/Zilliqa/Zilliqa/wiki/Address-Standard#specification
const Bech32AddrLen = "zil".length + 1 + 32 + 6;

/**
 * Zilliqa API
 *
 * @example
 * import Zil from "@ledgerhq/hw-app-zil";
 * const zil = new Zil(transport)
 */
class Zilliqa {

    constructor(transport, scrambleKey = "w0w") {
        this.transport = transport;
        transport.decorateAppAPIMethods(
            this,
            [
                "getVersion",
                "getPublicKey",
                "getPublicAddress",
                "signHash",
                "signTxn"
            ],
            scrambleKey
        );
    }

    getVersion() {
        const P1 = 0x00;
        const P2 = 0x00;

        return this.transport
            .send(CLA, INS.getVersion, P1, P2)
            .then(response => {
                let version = "v";
                for (let i = 0; i < 3; ++i) {
                    version += parseInt("0x" + response[i]);
                    if (i !== 2) {
                        version += "."
                    }
                }
                return {version};
            });
    }

    getPublicKey(index) {
        const P1 = 0x00;
        const P2 = 0x00;

        let payload = Buffer.alloc(4);
        payload.writeInt32LE(index);

        return this.transport
            .send(CLA, INS.getPublickKey, P1, P2, payload)
            .then(response => {
                // The first PubKeyByteLen bytes are the public address.
                const publicKey = response.toString("hex").slice(0, (PubKeyByteLen*2));
                return {publicKey};
            });
    }

    getPublicAddress(index) {
        const P1 = 0x00;
        const P2 = 0x01;

        let payload = Buffer.alloc(4);
        payload.writeInt32LE(index);

        return this.transport
            .send(CLA, INS.getPublicAddress, P1, P2, payload)
            .then(response => {
                // After the first PubKeyByteLen bytes, the remaining is the bech32 address string.
                const pubAddr = response.slice(PubKeyByteLen, PubKeyByteLen + Bech32AddrLen).toString("utf-8");
                return {pubAddr};
            });
    }

    signHash(keyIndex, hashStr) {
        const P1 = 0x00;
        const P2 = 0x00;

        let indexBytes = Buffer.alloc(4);
        indexBytes.writeInt32LE(keyIndex);

        const hashBytes = Buffer.from(hashStr, "hex");
        let hashLen = hashBytes.length;
        if (hashLen <= 0) {
            throw Error(`Hash length ${hashLen} is invalid`);
        }

        if (hashLen > HashByteLen) {
            hashBytes.slice(0, HashByteLen);
        }

        const payload = Buffer.concat([indexBytes, hashBytes]);

        return this.transport
            .send(CLA, INS.signHash, P1, P2, payload)
            .then(response => {
                return {sig: response.toString('hex').slice(0, SigByteLen * 2)}
            });
    }

    signTxn(keyIndex, txnParams) {
        // https://github.com/Zilliqa/Zilliqa-JavaScript-Library/tree/dev/packages/zilliqa-js-account#interfaces
        const P1 = 0x00;
        const P2 = 0x00;

        let indexBytes = Buffer.alloc(4);
        indexBytes.writeInt32LE(keyIndex);

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

        const encodedTxn = txnEncoder(txnParams);
        const message = JSON.stringify({"Encoded transaction" : encodedTxn.toString('hex')}, null, 2);
        console.log(chalk.green(message));
        let txnSizeBytes = Buffer.alloc(4);
        txnSizeBytes.writeInt32LE(encodedTxn.length);
        const payload = Buffer.concat([indexBytes, txnSizeBytes, encodedTxn]);

        return this.transport
            .send(CLA, INS.signTxn, P1, P2, payload)
            .then(response => {
                return {sig: (response.toString('hex').slice(0, SigByteLen * 2))}
            });
    }
}

exports.default = Zilliqa;
