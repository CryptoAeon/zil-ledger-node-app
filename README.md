# Zillqa Ledger NodeJS App

## Introduction

A Ledger Nano S is a hardware wallet. Hardware wallets are considered very secure for the storage of a user’s private keys in the blockchain world. Your digital assets are safe even when using an infected (or untrusted) PC. Zilliqa Ledger NodeJS App is a command line application to generate keypairs and sign transactions to be broadcasted on the Zilliqa blockchain.

## Requirements

Installing the dependencies and setting up the ledger environment:
https://github.com/LedgerHQ/blue-loader-python

## Install

```yarn install```

## Nano S Firmware

Assuming `--targetId 0x31100004`.\
> This might change with future nano upgrades

## Connect your Ledger device

All options below require an active USB conenction to your Ledger device.
Each step is interactive so pay attention to device's screen after you select 
something from the menu.

## Menu
To bring up the menu, simply do `node main.js` at the NodeJS app directory. You will be presented with 7 different options as shown below:
```
Welcome to the Zilliqa Ledger Node App!

Please enter a number between 1 and 7:
1) Download and install the Ledger app
2) Get the app version
3) Generate public key
4) Get public address
5) Sign hash (32 bytes)
6) Sign transaction (max 256 bytes)
7) Exit
```

### Option 1: Installation of Ledger Nano S app
1. To install the Ledger Nano S application by entering the Option `1`
2. You will be prompted with a screen "Allow Unknown Manager" on the Ledger Nano S device. Right click on the device to install
3. Enter your PIN for the Ledger Nano S device to authorise the installation
4. The latest Zilliqa `app.hex` file will be downloaded for you and installed on you Ledger Nano S device
5. A success code will be shown on this companion app's command line:
     ```
     Installation successful!
     {
       "exitCode": 0
     }
     ```

### Option 2: Get app version
1. To check the current Zilliqa Ledger Nano S app version. First, enter the Zilliqa nano S app by pressing both buttons when hovering over the Nano S icon
2. You will be prompted with a screen "Open non genuine app?". Right click on the device to proceed
3. Enter Option `2` on the companion NodeJS app
4. The current Zilliqa Ledger Nano S app version will be return in the companion app's command line:
     ```
     {
       "version": "v0.2.1"
     }
     ```

### Option 3: Generate public key
1. To generate a Public Key, enter Option `3` on the companion NodeJS app
2. You will be prompted to `Enter the key index:`. Choose any key index, starting from `0`
3. You will then be prompted to confirm `Generate Public Key #n?` (`n` being the key index) on your Ledger Nano S device
4. Right click to confirm and compare the generated Public Key on the Ledger Nano S device's screen and that on shown on the companion app command line as shown below:
     ```
     {
       "publicKey": "03b825eb9057bcd498eec8f3571ed576f761b7d9716230862e2834b5e48f7a9ca8"
     }
     ```

### Option 4: Generate public address
1. To generate an address, enter Option `4` on the companion NodeJS app
2. You will be prompted to `Enter the key index:`. Choose any key index, starting from `0`
3. You will then be prompted to confirm `Generate Address Key #n?` (`n` being the key index) on your Ledger Nano S device
4. Right click to confirm and compare the generated address on the Ledger Nano S device's screen and that on shown on the companion app command line as shown below:
     ```
     {
       "pubAddr": "zil1jkctz56st87p9kkxt7whnlwdqy99rnm7cxgfxv"
     }
     ```

### Option 5: Sign Hash
1. To sign an hash of 32 bytes, enter Option `5` on the companion NodeJS app
2. You will be prompted to `Enter the hash bytes:`. Key in any hash of 32 bytes that you wish to sign with your Ledger Nano S device
3. You will then be prompted to `Enter the key index:`. Choose any key index, starting from `0`
4. Compare the hash you are signing on the Ledger Nano S device screen, by scrolling through it using the Right button
5. Click on both Left and Right button on the Ledger Nano S device when to confirm that the hash you are signing is indeed correct
6. You will then be prompted to confirm `Sign this Hash with Key #n?` (`n` being the key index) on your Ledger Nano S device
7. Right click to confirm and the signature will be shown on the companion app command line as shown below:
     ```
     {
       "sig": "54a22a9808e049dfbc78a3228462dfa4b4192402df4439f5a2c911c795c1b31b3a8a3eafbf23fc4652e4c22e36f22bfd74e58425888336c1c4f73d675a849809"
     }
     ```

### Option 6: Sign Transaction
1. Create a transaction payload by creating a `.json` file, for example `txn.json` under the directory `/zil-ledger-node-app/test`. An example payload is as shown below:
     ```
     {
       "version": 65537,
       "nonce": 13,
       "toAddr": "8AD0357EBB5515F694DE597EDA6F3F6BDBAD0FD9",
       "amount": 100,
       "pubKey": "0205273e54f262f8717a687250591dcfb5755b8ce4e3bd340c7abefd0de1276574",
       "gasPrice": 1000000000,
       "gasLimit": 1
     }
     ```
    More details of the parameters specified above can be found in the `CreateTransaction` method section located in the [JSON-RPC documentation](https://apidocs.zilliqa.com/#createtransaction)
2. To sign the transaction payload as shown above, return to the menu page and enter the Option `6`
3. You will be prompted to `Enter the path to the transaction JSON file:`. Key in the path to the `.json` file that you have created. For example `./test/txn.json` for the example as shown above
4. You will then be prompted to `Enter the key index:`. Choose any key index, starting from `0`
5. Compare the `Encoded transaction` that is shown on your Ledger Nano S device and the one shown on the companion app
6. Click on both Left and Right button on the Ledger Nano S device when to confirm that the encoded transaction you are signing is indeed correct
7. You will then be prompted to confirm `Sign this Txn with Key #n?` (`n` being the key index) on your Ledger Nano S device
8. Right click to confirm and the signature will be shown on the companion app command line as shown below:
     ```
     {
       "sig": "c95cdb300cdeb646adb36c47863c16ce3ca79db037e568cb34c9fa74127adb559c0cda7522d39f6d97fb689b0fb020f0a7e359855a02f9d76339be60f61a8951"
     }
     ```
     
### Option 7: Exit
1. Exit the companion app by entering the Option `7`.
