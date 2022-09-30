import styles from '../assets/pages/Gold.module.css';
import Searchbar from '../components/searchbar/searchbar';
import CollectionsContainer from '../components/goldPage/collectionsContainer.js/collectionsContainer';
import InfoContainer from '../components/goldPage/infoContainer/infoContainer';
import AllowanceModal from '../components/goldPage/allowanceModal/allowanceModal';
import LoadingSpinner from '../components/loadingSpinner/loadingSpinner';
import { goldAddress } from '../services/web3/contracts/addresses';
import goldABI from '../services/web3/contracts/abi/goldABI.json';
import { epochToDate, purityToNumber } from '../services/utils/utils';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function Gold() {

    const [searchField, setSearchField] = useState('');
    const [availableCollections, setAvailableCollections] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAllowanceModal, setShowAllowanceModal] = useState(false);

    const handleAllowanceModal = () => {
        setShowAllowanceModal(true);
    };

    const onSearchChange = (e) => {
        setSearchField(e.target.value);
    };
    
    useEffect(() => {
        const showAvaliableGoldCollections = async () => {
            setLoading(true);
            try {
                const provider = new ethers.providers.AlchemyProvider("maticmum",  process.env.ALCHEMY_API);
                const contract = new ethers.Contract(goldAddress, goldABI, provider);
                const colecciones = await contract.showAvailbleGoldCollections();
                const coleccionesIndexes = colecciones.map((bigNumber) => {
                    return (bigNumber.toNumber());
                });
                const coleccionesInfo = coleccionesIndexes.map((colIndex) => {
                    return contract.GoldCollections(colIndex).then(response => {
                    const infoMerged = {
                        id: colIndex,
                        name: response.name,
                        onSale: response.onSale,
                        purity: purityToNumber(response.purity),
                        qtyAvailable: response.qtyAvailable.toNumber(),
                        weight: response.weight.toNumber(),
                        creationDate: epochToDate(response.creationDate)
                    }
                    return infoMerged });
                });
                return Promise.all(coleccionesInfo).then(function(results) {
                    return results;
                });
            } catch(err) {
                if ( err.code === -32603 ) {
                    console.log('A metamask error has occured, try again later');
                } else {
                    console.log('error');
                }
            } 
        }

        showAvaliableGoldCollections().then(function(respuesta) {
          setAvailableCollections(respuesta);
          setLoading(false);
        });
      }, []);

    return (
        <div className={styles.gold}>

            <main className={styles.goldContainer}>
                {
                    showAllowanceModal
                    &&
                    <AllowanceModal closeAllowanceModal={() => setShowAllowanceModal(false)}/>
                }
                <h1>SELECT A COLLECTION</h1>
                <Searchbar searchField={searchField} onSearchChange={onSearchChange} placeholder="Search available gold collections..." />
                {
                    availableCollections
                    ?
                    <CollectionsContainer availableCollections={availableCollections} searchField={searchField} />
                    :
                    (
                        loading
                        ?
                        <LoadingSpinner />
                        :
                        <span>No items for displat</span>
                    )
                }
                <InfoContainer  handleAllowanceModal={handleAllowanceModal}/>
            </main>

        </div>
    );
}; 