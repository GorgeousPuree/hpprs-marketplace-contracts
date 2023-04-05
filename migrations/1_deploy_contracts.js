const HpprsProjectMarketplace = artifacts.require("HpprsProjectMarketplace");

const ERC721Example = artifacts.require("ERC721Example");
const ERC721AExample = artifacts.require("ERC721AExample");
const ERC1155Example = artifacts.require("ERC1155Example");

module.exports = async function (deployer) {
    // await deployer.deploy(ERC721Example);
    // await deployer.deploy(ERC721AExample);
    // await deployer.deploy(ERC1155Example);

    await deployer.deploy(HpprsProjectMarketplace);
}