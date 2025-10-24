# ERC4626 Deposit

Running test requires running Anvil locally.
Enter smart-contract directory and follow instructions from README.md

## Notes
In task description it was mentioned that `finish the deposit function so it correctly deposits into an ERC-4626-compliant vault`, but we pass Public Client there.  
So I assumed that function return prepared transaction and tx is sent outside of it (as showcased in the last test).
