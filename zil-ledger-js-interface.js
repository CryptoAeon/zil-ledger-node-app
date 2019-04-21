const txnEncoder = require('@zilliqa-js/account/dist/util').encodeTransactionProto;
const {BN, Long} = require('@zilliqa-js/util');
const {compressPublicKey} = require('@zilliqa-js/crypto/dist/util');

const CLA = 0xe0;
const INS = {
    "getVersion": 0x01,
    "getPublickKey": 0x02,
    "getAddress": 0x02,
    "signHash": 0x04,
    "signTxn": 0x08
};

function extractResultFromResponse(response) {
    // 72 is the signature length as defined in the low level nano s syscall
    return response.slice(0, 72).toString('hex');
}

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
        const P2 = 0x01;

        let payload = Buffer.alloc(4);
        payload.writeInt32LE(index);

        return this.transport
            .send(CLA, INS.getAddress, P1, P2, payload)
            .then(response => {
                const publicKey = response.toString("hex").slice(0, 32);
                return {publicKey};
            });
    }

    getPublicAddress(index) {
        const P1 = 0x00;
        const P2 = 0x00;

        let payload = Buffer.alloc(4);
        payload.writeInt32LE(index);

        return this.transport
            .send(CLA, INS.getPublickKey, P1, P2, payload)
            .then(response => {
                const pubAddr = response.toString("hex").slice(32);
                return {pubAddr};
            });
    }

    signHash(keyIndex, signatureStr) {
        const P1 = 0x00;
        const P2 = 0x00;

        let indexBytes = Buffer.alloc(4);
        indexBytes.writeInt32LE(keyIndex);

        const sigBYtes = Buffer.from(signatureStr, "hex");
        let sigLen = sigBYtes.length;
        if (sigLen <= 0) {
            throw Error(`Signature length ${sigLen} is invalid`);
        }

        if (sigLen > 64) {
            sigBYtes.slice(0, 64);
        }

        const payload = Buffer.concat([indexBytes, sigBYtes]);

        return this.transport
            .send(CLA, INS.signHash, P1, P2, payload)
            .then(response => {
                return {sig: extractResultFromResponse(response)}
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
        let txnSizeBytes = Buffer.alloc(4);
        txnSizeBytes.writeInt32LE(encodedTxn.length);
        const payload = Buffer.concat([indexBytes, txnSizeBytes, encodedTxn]);

        return this.transport
            .send(CLA, INS.signTxn, P1, P2, payload)
            .then(response => {
                return {sig: extractResultFromResponse(response)}
            });
    }
}

exports.default = Zilliqa;
