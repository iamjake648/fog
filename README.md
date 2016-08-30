# Fog | Monero Wallet

Fog is an upcoming, open source GUI front-end for the Monero simple wallet. It uses electron and should work across OSX/Linux/Windows. It's being developed on a mac with that binary, so if you would like to use it on another platform, you'll need to add that platform's binary. 

To build this you'll need node installed. 

```
npm install && npm update
```

This wallet uses's node's child_process and spawn to create wrapper functions around simplewallet's options. 

### Features
 * Generate a new Wallet (In development)
 * Load a wallet
 * Show current address
 * Check balance
 * Show blockchain height
 * Check incoming transfers
 * Refresh (Sync payments and balances)
 * Transfer
