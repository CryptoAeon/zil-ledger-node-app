const readline = require('readline');
const chalk = require('chalk');

const choices = [
    "Download and install the Ledger app",
    "Get the app version",
    "Generate public key",
    "Get public address",
    "Sign hash (32 bytes)",
    "Sign transaction (max 256 bytes)",
    "Exit"
];

function generateMenu(choices) {
    let menu = "";
    choices.forEach((c, i) => { menu += `${(i + 1)}) ${c}\n` });
    menu += "> ";
    return menu;
}

const menu = generateMenu(choices);


const handlers = require("./handlers");

// Main
async function promptUser() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log(chalk.yellow(`\nPlease enter a number between 1 and ${choices.length}:`));
    const exitN = choices.length - 1;
    return await new Promise((resolve) => {
        rl.question(chalk.yellow(menu), async (answer) => {
            if (isNaN(answer)) {
                console.log(`Invalid number: ${answer}`);
            }

            const choiceIdx = Number(answer) - 1;
            if (choiceIdx === exitN) {
                return resolve(true);
            }

            if (handlers[choiceIdx]) {
                try {
                    const r = await handlers[choiceIdx]();
                    console.log(chalk.blue(JSON.stringify(r, null, 2)));
                }
                catch (e) {
                    console.error("Encountered error: " + e.message);
                }
            }

            rl.close();
            return resolve(false);
        });
    });
}

async function main() {
    console.log(chalk.green("Welcome to the Zilliqa Ledger Node App!"));

    while (true) {
        try {
            const done = await promptUser();
            if (done) {
                console.log("Goodbye!");
                process.exit(0);
            }
        }
        catch(e) {
            console.error(e.message);
        }
    }
}

main();