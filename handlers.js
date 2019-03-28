require("babel-polyfill"); // side-effects...
const TransportNodeHid = require("@ledgerhq/hw-transport-node-hid").default;
const Z = require("./zil-ledger-js-interface").default;
const readline = require('readline');
const chalk = require('chalk');
const fs = require('fs');
const curl = require('curlrequest')

const ELF_URL = 'https://github.com/CryptoAeon/zil-ledger-nano-s/releases/download/0.1/app.hex';

function getReadlineInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

async function open() {
    try {
        const t = await TransportNodeHid.open("");
        t.setDebugMode(true);
        return t;
    } catch (e) {
        return e.message;
    }
}

async function installApp() {
    const opts = {url: ELF_URL, timeout: 5, encoding: null};
    return await new Promise(resolve => {
        curl.request(opts, function (err, hexFile) {
            if (err) {
                return resolve(err);
            }

            fs.writeFile("./app.hex", hexFile, function (err) {
                if (err) {
                    return resolve(err);
                }

                console.info(chalk.blue("Downloaded Zilliqa hex file."));
                console.info(chalk.blue("Ledger device will ask you for confirmations..."));

                const proc = require("./installApp");
                proc.on('exit', (exitCode) => {
                    if (exitCode !== 0) {
                        console.error(`Installation failed: ${exitCode}`);
                    }
                    else {
                        console.info(chalk.blue(`Installation successful!`));
                    }
                    return resolve({exitCode});
                });
            });
        });

    });
}

async function getAppVersion() {
    const transport = await open();
    if (transport instanceof Error) {
        return transport.message
    }

    const zil = new Z(transport);
    return await zil.getVersion().then(r => {
        transport.close().catch(e => {
            console.error(e.message)
        }).then(() => {
            return r
        });
        return r;
    });
}

async function getPubKey() {
    const transport = await open();
    if (transport instanceof Error) {
        return transport.message
    }

    const q = "> Enter the key index: ";
    return await new Promise((resolve) => {
        getReadlineInterface().question(chalk.yellow(q), async (index) => {
            if (isNaN(index)) {
                console.error("Index should be an integer.");
                return resolve("Bad input.");
            }
            const zil = new Z(transport);
            return zil.getPublicAddress(index).then(r => {
                transport.close().catch(e => {
                    console.error(e.message);
                }).then(() => {
                    return resolve(r)
                });
                return resolve(r);
            });

        });
    });
}

async function getPublicAddress() {
    const transport = await open();
    if (transport instanceof Error) {
        return transport.message
    }

    const q = "> Enter the key index: ";
    return await new Promise((resolve) => {
        getReadlineInterface().question(chalk.yellow(q), async (index) => {
            if (isNaN(index)) {
                console.error("Index should be an integer.");
                return resolve("Bad input.");
            }
            const zil = new Z(transport);
            return zil.getPublicAddress(index).then(r => {
                transport.close().catch(e => {
                    console.error(e.message);
                }).then(() => {
                    return resolve(r)
                });
                return resolve(r);
            });

        });
    });
}

async function signHash() {
    throw Error('not implemented');
}

async function signTxn() {
    const transport = await open();
    if (transport instanceof Error) {
        return transport.message
    }

    const q = "> Enter the path to the transaction JSON file: ";
    return await new Promise((resolve) => {
        getReadlineInterface().question(chalk.yellow(q), async (txnJsonFile) => {
            if (typeof txnJsonFile !== "string" ) {
                console.error("Need to specify path to a JSON file.");
                return resolve("Bad input.");
            }

            const txnParams = JSON.parse(fs.readFileSync(txnJsonFile, 'utf8'));

            const zil = new Z(transport);
            return zil.signTxn(txnParams).then(r => {
                transport.close().catch(e => {
                    console.error(e.message);
                }).then(() => {
                    return resolve(r)
                });
                return resolve(r);
            });

        });
    });
}

module.exports = [
    installApp,
    getAppVersion,
    getPubKey,
    getPublicAddress,
    signHash,
    signTxn
];
