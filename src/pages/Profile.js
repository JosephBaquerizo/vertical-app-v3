import styles from '../assets/pages/Profile.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTokensInfo } from '../services/web3/utils';
import { threeDecimalFormat, epochToDate } from '../services/utils/utils';
import { ethers } from 'ethers';
import { goldAddress, artAddress } from '../services/web3/contracts/addresses';
import goldABI from '../services/web3/contracts/abi/goldABI.json';
import artABI from '../services/web3/contracts/abi/artABI.json';
import GoldSection from '../components/profilePage/goldSection/goldSection';
//import ArtSection from '../components/profilePage/artSection/artSection';

export default function Profile() {
    
    const user = useSelector((state) => state.user.address);

    //const [toggleGoldArt, setToggleGoldArt] = useState(true);
    const [goldTokens, setGoldTokens] = useState([]);
    //const [artTokens, setArtTokens] = useState([]);
    const [loading, setLoading] = useState(false);

    /*const toggleToGold = () => {
        setToggleGoldArt(true);
    };

    const toggleToArt = () => {
        setToggleGoldArt(false);
    };*/

    useEffect(() => {
        const loadGoldTokens = async () => {
            setLoading(true);
            if (user) {
                const provider = new ethers.providers.AlchemyProvider('maticmum', process.env.ALCHEMY_API);
                const goldContract = new ethers.Contract(goldAddress, goldABI, provider);
                try {
                    const tokensInfo = await getTokensInfo(user, goldContract);
                    return tokensInfo;
                } catch(error) {
                    console.log(error);
                };
            };
            return [];
        };
        /*const loadArtTokens = async () => {
            if ( user ) {
                const provider = new ethers.providers.AlchemyProvider('maticmum', process.env.ALCHEMY_API);
                const artContract = new ethers.Contract(artAddress, artABI, provider);
                try {
                    // falta un walletOfOwner (como el que está en oro) pero para el arte, por eso aquí uso un dato quemado
                    const tokenURI = await artContract.tokenURI(0);
                    const base64 = tokenURI.slice(29);
                    const decoded = atob(base64);
                    const parsedInfo = JSON.parse(decoded);
                    const infoMerged = {
                        creationDate: epochToDate(parsedInfo.attributes[0].value),
                        ownerName: parsedInfo.attributes[1].value,
                        estimatedPrice: parsedInfo.attributes[2].value,
                        goldSupport: threeDecimalFormat(ethers.utils.formatEther(parsedInfo.attributes[3].value)),
                        royalties: parsedInfo.attributes[4].value
                    };
                    console.log(infoMerged);
                    return infoMerged;
                } catch(error) {
                    console.log(error);
                    return [];
                }
            }
        };*/
        loadGoldTokens().then(function(response) {
            setGoldTokens(response);
            setLoading(false);
        });
        /*loadArtTokens().then(function(response) {
            setArtTokens([response]);
        });*/
    }, [user]);

    return (
        <div className={styles.profile}>
            <h1>Profile</h1>
            <div className={styles.options}>
                {/*
                <button className={!toggleGoldArt ? styles.option : styles.selectedOption} onClick={toggleToGold}>Your Gold</button>
                <button className={!toggleGoldArt ? styles.selectedOption : styles.option} onClick={toggleToArt}>Your Art</button>
                */}
            </div>
            {/*
                toggleGoldArt
                ?
                <GoldSection goldTokens={goldTokens} />
                :
                <ArtSection artTokens={artTokens} />
            */}
            <GoldSection goldTokens={goldTokens} loading={loading} />
        </div>
    );
};