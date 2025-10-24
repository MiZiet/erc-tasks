// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Script.sol";
import "../src/TestToken.sol";
import "../src/TestVault.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();

        TestToken token = new TestToken();
        console.log("Token deployed at:", address(token));

        // Deploy vault
        TestVault vault = new TestVault(token, 500 ether);
        console.log("Vault deployed at:", address(vault));

        vm.stopBroadcast();


        console.log("Deployer:", msg.sender);
        console.log("TestToken deployed at:", address(token));
        console.log("TestVault deployed at:", address(vault));

        // Save addresses for frontend or Bun scripts
        string memory json = string.concat(
            "{\n  \"token\": \"", vm.toString(address(token)),
            "\",\n  \"vault\": \"", vm.toString(address(vault)),
            "\"\n}"
        );
        vm.writeFile("deployments/anvil.json", json);
    }
}
