import styles from '../../../assets/components/searchArt.module.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { artAddress } from '../../../services/web3/contracts/addresses';
import artABI from '../../../services/web3/contracts/abi/artABI.json';
import { epochToDate, threeDecimalFormat } from '../../../services/utils/utils';
import ArtCard from '../artCard/artCard';
import LoadingSpinner from '../../loadingSpinner/loadingSpinner';


export default function Search() {

    const [artCollection, setArtCollection] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const loadArtTokens = async () => {
            setLoading(true);
            try {
                const provider = new ethers.providers.AlchemyProvider("maticmum",  process.env.ALCHEMY_API);
                const artContract = new ethers.Contract(artAddress, artABI, provider);
                const totalMint = await artContract.totalMint();
                const arreglo = Array.from(Array(Number(totalMint)).keys());
                const coleccionesInfo =  arreglo.map( async (item, index) => {
                    const tokenURI = await artContract.tokenURI(item);
                    const base64 = tokenURI.slice(29);
                    const decoded = atob(base64);
                    const parsedInfo = JSON.parse(decoded);
                    console.log(parsedInfo);
                    const infoMerged = {
                        tokenId: item,
                        description: parsedInfo.description,
                        creationDate: epochToDate(parsedInfo.attributes[0].value),
                        ownerName: parsedInfo.attributes[1].value,
                        estimatedPrice: parsedInfo.attributes[2].value,
                        goldSupport: threeDecimalFormat(ethers.utils.formatEther(parsedInfo.attributes[3].value)),
                    };
                    return infoMerged;
                });
                return Promise.all(coleccionesInfo).then(function(results) {
                    console.log(results)
                    return results;
                });
            } catch(error) {
                console.log(error);
            }
        }

       loadArtTokens().then(function(response) {
        setArtCollection(response);
        setLoading(false);
       });
 
    }, [])


    return (
        <div className={styles.searchContainer}>
            {
                artCollection.length
                ?
                <div className={styles.artItemsContainer}>
                    {
                        artCollection.map((item, index) => {
                            return <ArtCard key={index} artToken={item} />
                        })
                    }
                </div>
                :
                (
                    loading
                    ?
                    <LoadingSpinner />
                    :
                    <div className={styles.noItems}>
                        <span>No items for display...</span>
                    </div>
                )
            }
        </div>
    )
}