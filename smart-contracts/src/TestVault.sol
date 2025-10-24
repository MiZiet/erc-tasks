// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin-contracts-5.4.0/token/ERC20/extensions/ERC4626.sol";
import "./TestToken.sol";

contract TestVault is ERC4626 {
     uint256 private _maxDepositLimit; // rename to avoid conflict
    constructor(TestToken _asset, uint256 _maxDeposit)
        ERC4626(_asset)
        ERC20("TestVault", "TVLT")
    {
        _maxDepositLimit = _maxDeposit;
    }

     // Override ERC4626's maxDeposit function
    function maxDeposit(address) public view override returns (uint256) {
        return _maxDepositLimit;
    }
}
