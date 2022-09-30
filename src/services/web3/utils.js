import { ethers } from 'ethers';

export const maybeFixMetamaskConnection = async () => {
    const waitSeconds = 2;
    if (typeof window !== "undefined" && typeof window.ethereum !== 'undefined' &&  !window.ethereum._state.initialized) {
        while(!window.ethereum._state.initialized) {
            await new Promise(resolve => setTimeout(resolve, waitSeconds * 1000)); 
            window.location.reload();
        };
    };
};

export const getTokensInfo = async (user, goldContract) => {
    let tokenIdArray = await goldContract.walletOfOwner(user);
    if (tokenIdArray.length) {
        tokenIdArray = tokenIdArray.map((id) => {
            return id.toString();
        });
        const tokensInfo = tokenIdArray.map(async (id) => {
            const collectionName = await goldContract.collectionName(id);
            const purity = await goldContract.goldPurity(id);
            const tokenURI = await goldContract.tokenURI(id);
            const base64 = tokenURI.slice(29);
            const decoded = atob(base64);
            const parsedInfo = JSON.parse(decoded);
            const infoMerged = {
                id: Number(id),
                name: parsedInfo.name,
                image: parsedInfo.image,
                creationDate: parsedInfo.attributes[0].value.toString(),
                weight: parseInt(parsedInfo.attributes[1].value),
                estimatedPrice: parsedInfo.attributes[2].value,
                collectionId: parsedInfo.attributes[3].value,
                collectionName: collectionName,
                purity: Number(purity),
            };
            return infoMerged;
        });
        return Promise.all(tokensInfo).then(function(results) {
            return results;
        });
    } else {
        return [];
    };
};

export const getUserAllowance = async (userAddress, goldAddress, usdcContract) => {
    let userAllowance = await usdcContract.allowance(userAddress, goldAddress);
    userAllowance = parseFloat(ethers.utils.formatEther(userAllowance));
    return userAllowance;
};

export const mintCollection = async (userAddress, goldContract, quantity, mintcardId) => {
    const mintTransaction = await goldContract.mint(userAddress, quantity, mintcardId);
    const mintReceipt = await mintTransaction.wait();
};

export const approveAllowance = async (userAddress, usdcContract, goldAddress) => {
    const userUsdcBalance = await usdcContract.balanceOf(userAddress);
    const usdcApprovalTransaction = await usdcContract.approve(goldAddress, userUsdcBalance);
    const usdcApprovalReceipt = await usdcApprovalTransaction.wait();
};