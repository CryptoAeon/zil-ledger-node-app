const spawn = require('child_process').spawn;

const proc = spawn('python', [
    '-m', 'ledgerblue.loadApp',
    '--path', "44'/313'",
    "--curve", "secp256k1",
    "--tlv",
    "--targetId", "0x31100004",
    "--delete",
    "--fileName", "app.hex",
    "--appName", "Zilliqa",
    "--appVersion", "0.4.2",
    "--appFlags", "0x40"
]);
var bytesToStr = function (data) {
    return String.fromCharCode.apply(null, data);
};
// Handle normal output
proc.stdout.on('data', (data) => {
    console.log(bytesToStr(data));
});

// Handle error output
proc.stderr.on('data', (data) => {
    // As said before, convert the Uint8Array to a readable string.
    console.log(bytesToStr(data));
});

module.exports = proc;
