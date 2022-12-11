const HpprsMarketplaceOrchestrator = artifacts.require("HpprsMarketplaceOrchestrator");

const ERC721Example = artifacts.require("ERC721Example");
const ERC721AExample = artifacts.require("ERC721AExample");
const ERC1155Example = artifacts.require("ERC1155Example");

contract("HpprsMarketplaceOrchestrator", (accounts) => {
    let eRC721Example = null;
    let eRC721AExample = null;
    let eRC1155Example = null;
    let hpprsMarketplaceOrchestrator = null;

    before(async () => {
        eRC721Example = await ERC721Example.deployed();
        eRC721AExample = await ERC721AExample.deployed();
        eRC1155Example = await ERC1155Example.deployed();
        hpprsMarketplaceOrchestrator = await HpprsMarketplaceOrchestrator.deployed();

        // Seed with some NFTs from all example ERC contracts.
        await eRC721Example.mint(5, {from: accounts[0]});
        await eRC721AExample.mint(5, {from: accounts[0]});
        await eRC1155Example.mint(5, {from: accounts[0]});
    })

    it('Send ERC721 to Marketplace SC and redeem it right away', async () => {
        await eRC721Example.safeTransferFrom(accounts[0], hpprsMarketplaceOrchestrator.address, 1);

        let userTokenNumber = (await eRC721Example.balanceOf(accounts[0])).toNumber();
        let contractTokenNumber = (await eRC721Example.balanceOf(hpprsMarketplaceOrchestrator.address)).toNumber();

        assert.equal(userTokenNumber, 4, "User must not have the token.")
        assert.equal(contractTokenNumber, 1, "Contract must have the token.")

        await hpprsMarketplaceOrchestrator.redeemERC721(eRC721Example.address, 1, {from: accounts[0]});

        userTokenNumber = (await eRC721Example.balanceOf(accounts[0])).toNumber();
        contractTokenNumber = (await eRC721Example.balanceOf(hpprsMarketplaceOrchestrator.address)).toNumber();
        assert.equal(userTokenNumber, 5, "User must have the token.")
        assert.equal(contractTokenNumber, 0, "Contract must not have the token.")
    });

    it('Send ERC721A to Marketplace SC and redeem it right away', async () => {
        await eRC721AExample.safeTransferFrom(accounts[0], hpprsMarketplaceOrchestrator.address, 1);

        let userTokenNumber = (await eRC721AExample.balanceOf(accounts[0])).toNumber();
        let contractTokenNumber = (await eRC721AExample.balanceOf(hpprsMarketplaceOrchestrator.address)).toNumber();

        assert.equal(userTokenNumber, 4, "User must not have the token.")
        assert.equal(contractTokenNumber, 1, "Contract must have the token.")

        await hpprsMarketplaceOrchestrator.redeemERC721(eRC721AExample.address, 1, {from: accounts[0]});

        userTokenNumber = (await eRC721AExample.balanceOf(accounts[0])).toNumber();
        contractTokenNumber = (await eRC721AExample.balanceOf(hpprsMarketplaceOrchestrator.address)).toNumber();
        assert.equal(userTokenNumber, 5, "User must have the token.")
        assert.equal(contractTokenNumber, 0, "Contract must not have the token.")
    });

    it('Send ERC1155 to Marketplace SC and redeem it right away', async () => {
        await eRC1155Example.safeTransferFrom(accounts[0], hpprsMarketplaceOrchestrator.address, 1, 3, []);

        let userTokenNumber = (await eRC1155Example.balanceOf(accounts[0], 1)).toNumber();
        let contractTokenNumber = (await eRC1155Example.balanceOf(hpprsMarketplaceOrchestrator.address, 1)).toNumber();

        assert.equal(userTokenNumber, 2, "User must have less tokens.")
        assert.equal(contractTokenNumber, 3, "Contract must have tokens.")

        await hpprsMarketplaceOrchestrator.redeemERC1155(eRC1155Example.address, 1, 3, {from: accounts[0]});

        userTokenNumber = (await eRC1155Example.balanceOf(accounts[0], 1)).toNumber();
        contractTokenNumber = (await eRC1155Example.balanceOf(hpprsMarketplaceOrchestrator.address, 1)).toNumber();
        assert.equal(userTokenNumber, 5, "User must have tokens.")
        assert.equal(contractTokenNumber, 0, "Contract must not have tokens.")
    });
})