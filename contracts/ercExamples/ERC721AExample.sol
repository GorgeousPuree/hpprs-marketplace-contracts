// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "erc721a/contracts/ERC721A.sol";

contract ERC721AExample is ERC721A {

    constructor() ERC721A("ERC721 example contract", "ERC721EXAMPLE"){}

    function mint(uint _amount) external {
        _mint(msg.sender, _amount);
    }
}
