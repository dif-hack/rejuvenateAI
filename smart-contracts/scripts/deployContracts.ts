import { Wallet, getDefaultProvider} from "ethers";
require('dotenv').config()
import { ethers, run, network } from "hardhat";
import { NutritionistNFT__factory, UserNFT__factory, Treasury__factory, CommunityNetwork__factory } from "../typechain-types";

//const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
//const wallet = new ethers.Wallet(PRIVATE_KEY, ethers.provider);

const treasuryAddr = "0x9E1eF5A92C9Bf97460Cd00C0105979153EA45b27"
const communityNetworkAddr = "0x3a65168B746766066288B83417329a7F901b5569"
const userNftAddr = "0x6D919b8dC30BEf41b56Aa8b18b2052c9459F8E9A"
const nutritionistNftAddr = "0xA39d26482B5c226Fd02A5f3e159C72ee03d63Fc0"


const privateKey = process.env.PRIVATE_KEY as string;
const wallet = new Wallet(privateKey);

const pegoRpc = "https://pegorpc.com"


// const communityContract = "0x3a65168B746766066288B83417329a7F901b5569"
// const treasuryContract = "0x9E1eF5A92C9Bf97460Cd00C0105979153EA45b27"
// const nutritionistNftContract = "0xA39d26482B5c226Fd02A5f3e159C72ee03d63Fc0"
// const userNftContract = "0x6D919b8dC30BEf41b56Aa8b18b2052c9459F8E9A"

async function main() {
    //await deployCommunityContracts();
  
    await setupNFTs();
    //await joinCommunity("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");

    // const chainID = network.config.chainId;
    // if (chainID != 31337) {
    //     await verifyContract()
    // }

    //await joinCommunity(communityContract);
}

async function deployTreasury() {
    //console.log("Deploying Treasury....");

    //const provider = getDefaultProvider(rpc)
    //const connectedWallet = wallet.connect(provider);
    //const TreasuryFactory = new Treasury__factory(connectedWallet);

    const TreasuryFactory = await ethers.getContractFactory("Treasury");
    const treasury = await TreasuryFactory.deploy();
    await treasury.deployed();
    console.log("---- Treasury Contract was deployed to: ---- ", treasury.address);
    return treasury.address;
}

async function deployUserNFT(_communityAddr: any) {
    //console.log("Deploying UserNFT....");
    const UserNFTFactory = await ethers.getContractFactory("UserNFT");
    const userNFT = await UserNFTFactory.deploy("User NFT", "UST", _communityAddr, {gasLimit: 8000000});
    await userNFT.deployed();
    console.log("---- UserNFT Contract was deployed to: ---- ", userNFT.address);
    return userNFT.address;
}

async function deployNutritionistNFT(_communityAddr: any) {
    //console.log("Deploying NutrionistNFT....");
    const NutritionistNFTFactory = await ethers.getContractFactory("NutritionistNFT");
    const nutritionistNFT = await NutritionistNFTFactory.deploy("Nutritionist NFT", "NUT", _communityAddr, {gasLimit: 8000000});
    await nutritionistNFT.deployed();
    console.log("---- NutritionistNFT Contract was deployed to: ---- ", nutritionistNFT.address);
    return nutritionistNFT.address;
}

async function joinCommunity(_communityAddr: any) {
    
    const provider = getDefaultProvider(pegoRpc);
    const connectedWallet = wallet.connect(provider);

    const communityFactory = new CommunityNetwork__factory(connectedWallet);
    const community = communityFactory.attach(_communityAddr);

    console.log("joining community network...")
    const amount = ethers.utils.parseEther("0.01");
    const tx = await community.registerUser("hello", "just testing", {gasLimit: 6000000, value: amount})
    //const tx = await community.getAllCommunties()
    await tx.wait();
    //console.log(tx.toString())
    console.log("community network successfully joined")
}

async function setupNFTs() {
    // let userNFTAddr = "0x7eF8A514802fe847766142b63D1A2554379EFD27"
    // let nutritionistNFTAddr = "0xa2e92d2f09eE1D5D166Bd4a8789C4C0dfF13708e"
    // let communityAddr = "0x61b230EB8f636BE7F96134F0922b765B8e86c60D"

    const provider = getDefaultProvider(pegoRpc);
    const connectedWallet = wallet.connect(provider);

    const communityFactory = new CommunityNetwork__factory(connectedWallet);
    const community = communityFactory.attach(communityNetworkAddr);

    try {
        console.log("Setting up NFTs for Pego")
        const tx = await community.setNFTs(userNftAddr, nutritionistNftAddr);
        await tx.wait();
        console.log("NFTs setup successful")
    }

    catch (error) {
        console.log(`[source] community.setNFTs ERROR!`);
        console.log(`[source]`, error);

    }
}


async function deployCommunityContracts() {
    console.log("Deploying Contracts for Pego....");
    let treasuryAddr;
    let communityAddr;
    try {
        console.log("Deploying treasury for Pego");
        treasuryAddr = await deployTreasury();

        const CommunityFactory = await ethers.getContractFactory("CommunityNetwork"/*, wallet*/);

        console.log("Deploying Community contract for Pego");
        const community = await CommunityFactory.deploy(treasuryAddr);
        await community.deployed();
        communityAddr = community.address;
        console.log("---- Community Contract for Pego was deployed to Pego testnet at this address: ---- ", community.address);
    }
    catch (error) {
        console.error("Error deploying Community for Pego:", error);
        throw error;
    }

    console.log("Deploying UserNFT for Pego....");
    let userNFT;
    try {
        userNFT = await deployUserNFT(communityAddr);
    }
    catch (error) {
        console.error("Error User NFT for Pego:", error);
        throw error;
    }

    console.log("Deploying NutritionistNFT for Pego....");
    let nutritionistNFT;
    try {
        nutritionistNFT = await deployNutritionistNFT(communityAddr);
    }
    catch (error) {
        console.error("Error Nutritionist NFT for Pego:", error);
        throw error;
    }
}

// async function verifyContract() {

//     console.log(`Verifying nutritionistNFT contract for Pego...`);

//     try {
//         await run("verify:verify", {
//             address: nutritionistNftContract,
//             constructorArguments: ["Nutritionist NFT", "NUT", communityContract],
//         });
//         //console.log(`contract for ${chain.name} verified`);
//     } catch (e: any) {
//         if (e.message.toLowerCase().includes("already verified")) {
//             console.log("Already verified!");
//         } else {
//             console.log(e);
//         }
//     }
// }


main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
