# Sign Hash Example

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
> 3
> Enter the key index: 0
=>e00200010400000000
(node:2020) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
<=01001421b90000003d997ed6d1fbfb91aa4c76b3183b739c69a4e1399471adf341358cfe535d081743c585183d30a27127c24d3d9000
{
  "publicKey": "01001421b90000003d997ed6d1fbfb91aa4c76b3183b739c69a4e1399471adf341358cfe535d081743c585183d30a27127c24d3d9000"
}

Please enter a number between 1 and 7:
1) Download and install the Ledger app
2) Get the app version
3) Generate public key
4) Get public address
5) Sign hash (32 bytes)
6) Sign transaction (max 256 bytes)
7) Exit
> 5
> Enter the signature bytes: 01001421b90000003d997ed6d1fbfb91aa4c76b3183b739c69a4e1399471adf341358cfe535d081743c585183d30a27127c24d3d9000
> Enter the key index: 0
=>e00400003a0000000001001421b90000003d997ed6d1fbfb91aa4c76b3183b739c69a4e1399471adf341358cfe535d081743c585183d30a27127c24d3d9000
<=304502210094f522d97a11fbf1ffdb59094243c18b4b62a6ed18b9cf43324f0e6605dc722302204a83b15548ac6cdf88865196767201895d73493a1284362d429000
{
  "sig": "304502210094f522d97a11fbf1ffdb59094243c18b4b62a6ed18b9cf43324f0e6605dc722302204a83b15548ac6cdf88865196767201895d73493a1284362d429000"
}

```

# Sign Txn Example
