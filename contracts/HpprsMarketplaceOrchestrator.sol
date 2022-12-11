// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract HpprsMarketplaceOrchestrator is ERC721Holder, ERC1155Holder {
    event TransactionCompleted (
        address _nftAddress,
        uint256 _assetId
    );

    function redeemERC721(address _nftAddress, uint256 _assetId) external {
        IERC721(_nftAddress).safeTransferFrom(
            address(this),
            msg.sender,
            _assetId
        );

        emit TransactionCompleted(_nftAddress, _assetId);
    }

    function redeemERC1155(address _nftAddress, uint256 _assetId, uint256 _amount) external {
        IERC1155(_nftAddress).safeTransferFrom(
            address(this),
            msg.sender,
            _assetId,
            _amount,
            ""
        );

        emit TransactionCompleted(_nftAddress, _assetId);
    }
}
