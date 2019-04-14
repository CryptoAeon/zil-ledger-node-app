# Zillqa Ledger Nano S App (NodeJS)

## Install

``` yarn install ``` (or `npm install`)

## Nano S Firmware

Assuming `--targetId 0x31100004`.\
> This might change with future nano upgrades


## Connect your Ledge device

All options below require an active USB conenction to your Ledger device.
Each step is interactive so pay attention to device's screen after you select 
something from the menu.

## Menu

```
Welcome to the Zilliqa Ledger Node App!

Please enter a number between 1 and 6:
1) Download and install the Ledger app
2) Get the app version
3) Generate public key
4) Sign hash (32 bytes)
5) Sign transaction (max 256 bytes)
6) Exit
> 1
Saved Zilliqa hex file.
Ledger device will ask you for confirmations...
Generated random root public key : 0427696ef511ce1a96021773bfaabe28eab278d5ce8cca7b782c2a71be2f1d192951a5f98cb0b13123a5a8aa72187c105701ba10e8b15636768f6cbd9f94b38802
Using test master key 0427696ef511ce1a96021773bfaabe28eab278d5ce8cca7b782c2a71be2f1d192951a5f98cb0b13123a5a8aa72187c105701ba10e8b15636768f6cbd9f94b38802 
Using ephemeral key 04ccb55904f653c0fef7a26f80dd3c5e50dd778f45e4a7c6fbf53386c0762e0c5d02474d9d1fca8f3e96f9205d411fa4c4f90e11724b315e5c58d8cca47721f3c8
Broken certificate chain - loading from user key
Target version is not set, application hash will not match!
Application full hash : 05795c28c02e07396a41e0757a709a4e0a1b351994ab493dfdfbf03cbea2c02c

Installation successful!
{exitCode: 0}
```

## Required Setup

For installation:
https://github.com/LedgerHQ/blue-loader-python