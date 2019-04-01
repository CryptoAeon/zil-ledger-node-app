const txnEncoder = require('@zilliqa-js/account/dist/util').encodeTransactionProto;

const CLA = 0xe0;
const INS = {
    "getVersion": 0x01,
    "getPublickKey": 0x02,
    "getAddress": 0x02,
    "signHash": 0x04,
    "signTxn": 0x06
};

function extractResultFromResponse(response) {
    const sepIdx = response.length - 2;
    const lenBytes = response.slice(sepIdx);
    const len = lenBytes.readUIntBE(0, lenBytes.length);
    return response.slice(0, len);
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

        let payload = new Buffer(4);
        payload.writeInt32LE(index);

        return this.transport
                   .send(CLA, INS.getAddress, P1, P2, payload)
                   .then(response => {
                       const publicKey = response.toString("hex");
                       return {publicKey};
                   });
    }

    getPublicAddress(index) {
        const P1 = 0x00;
        const P2 = 0x00;

        let payload = new Buffer(4);
        payload.writeInt32LE(index);

        return this.transport
                   .send(CLA, INS.getPublickKey, P1, P2, payload)
                   .then(response => {
                       const pubAddr = response.toString("hex").slice(0, 20);
                       return {pubAddr};
                   });
    }

    signHash(keyIndex, signatureStr) {
        const P1 = 0x00;
        const P2 = 0x00;

        let indexBytes = new Buffer(4);
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
                       return { sig: extractResultFromResponse(response) }
                   });
    }

    signTxn(txParams) {
        const P1 = 0x00;
        const P2 = 0x00;

        const encodedTxn = txnEncoder(txParams);

        return this.transport
                   .send(CLA, INS.signTxn, P1, P2, encodedTxn)
                   .then(response => {
                       return { sig: extractResultFromResponse(response) }
                   });
    }
}

exports.default = Zilliqa;
