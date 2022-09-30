import styles from '../../../assets/components/selectGoldModal.module.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';
import { goldAddress, artAddress } from '../../../services/web3/contracts/addresses';
import goldABI from '../../../services/web3/contracts/abi/goldABI.json';
import { getTokensInfo } from '../../../services/web3/utils';
import GoldCard from '../../goldCard/goldCard';
import artABI from '../../../services/web3/contracts/abi/artABI.json';


export default function SelectGoldModal({ closeModal, artTokenId }) {

    const userAddress = useSelector((state) => state.user.address);
    const selectedGoldCards = useSelector((state) => state.goldcard.selectedCards);
    const [goldCollection, setGoldCollection] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadGoldTokens = async () => {
            setLoading(true);
            if (userAddress) {
                const provider = new ethers.providers.AlchemyProvider('maticmum', process.env.ALCHEMY_API);
                const goldContract = new ethers.Contract(goldAddress, goldABI, provider);
                try {
                    const tokensInfo = await getTokensInfo(userAddress, goldContract);
                    return tokensInfo;
                } catch(error) {
                    console.log(error);
                };
            };
            return [];
        }

        loadGoldTokens().then(function(response) {
            setGoldCollection(response);
            setLoading(false);
        })

    }, [userAddress])

    const addGold = async () => {
        if (window.ethereum) {
            if (userAddress) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const contract = new ethers.Contract(artAddress, artABI, provider.getSigner());
                try {
                    const addTransaction = await contract.addGold(selectedGoldCards, artTokenId);
                    await addTransaction.wait();
                } catch(err) {
                    console.log(err);
                }
            }
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.goldCollectionContainer}>
                {
                    goldCollection.length
                    ?
                    goldCollection.map((item, index) => {
                        return <GoldCard goldTokenInfo={item} key={index} enableClick={true}/>
                    })
                    :
                    (
                        loading
                        ?
                        <span>Loading...</span>
                        :
                        <span>No gold collections</span>
                    )

                }
            </div>
            <button onClick={addGold}>ADD</button>
            <button onClick={closeModal}>Close</button>
        </div>
    )
}