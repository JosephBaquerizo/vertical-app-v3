import styles from '../../../assets/components/infoContainer.module.css';
import { threeDecimalFormat } from '../../../services/utils/utils';
import { goldAddress, usdcAddress, artAddress } from '../../../services/web3/contracts/addresses';
import goldABI from '../../../services/web3/contracts/abi/goldABI.json';
import usdcABI from '../../../services/web3/contracts/abi/usdcABI.json';
import artABI from '../../../services/web3/contracts/abi/artABI.json';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../../services/store/slices/userSlice';
import { alertActions } from '../../../services/store/slices/alertSlice';
import { useState } from 'react';
import { ethers } from 'ethers';

export default function InfoContainer({ handleAllowanceModal }) {

    const userAddress = useSelector((state) => state.user.address)
    const selectedCollection = useSelector((state) => state.mintcard.info);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState('');
    const [prices, setPrices] = useState(null);

    const quantityOnChange = (e) => {
        const value = e.target.value;
        const re1 = /[.,\s]/;
        const re =  /[1-9]+[0-9]*$/;
        if (value === '' || re.test(value)) {
            if (!re1.test(value)) {
                setQuantity(value);
                updatePrices(value, selectedCollection);
            };
        };
    };

    const updatePrices = async (quantityParam, collectionParam) => {
        try {
            if (collectionParam) {
                if (quantityParam !== "") {
                    setLoading(true);
                    const provider = new ethers.providers.AlchemyProvider("maticmum", process.env.ALCHEMY_API);
                    const contract = new ethers.Contract(goldAddress, goldABI, provider);
                    const prices = await contract.mintPrice(Number(quantityParam), collectionParam.id);
                    const mintPrice = ethers.utils.formatEther(prices[0]);
                    const maintenancePrice = ethers.utils.formatEther(prices[1]);
                    const totalPrice = ethers.utils.formatEther(prices[2]);
                    setPrices({
                        mintPrice,
                        maintenancePrice,
                        totalPrice
                    });
                    setLoading(false);
                } else {
                    setPrices(null);
                };
            } else {
                console.log('you need to select a collection');
            };
        } catch(error) {
          console.log(error);
        };
    };

    const getUserAllowance = async (usdcContract) => {
        const formatedMintPrice = parseFloat(prices.mintPrice);
        let userAllowance = await usdcContract.allowance(userAddress, goldAddress);
        userAllowance = parseFloat(ethers.utils.formatEther(userAllowance));
        return userAllowance > formatedMintPrice;
    };

    const updateUserInfo = async (usdcContract) => {
        let userAllowanceUpdated = await usdcContract.allowance(userAddress, goldAddress);
        userAllowanceUpdated = parseFloat(ethers.utils.formatEther(userAllowanceUpdated)).toFixed(2);
        let userBalanceUpdated = await usdcContract.balanceOf(userAddress);
        userBalanceUpdated = parseFloat(ethers.utils.formatEther(userBalanceUpdated)).toFixed(2);
        dispatch(userActions.setBalance(userBalanceUpdated));
        dispatch(userActions.setAllowance(userAllowanceUpdated));
    }

    const mint = async () => {
        try {
            const metamask = window.ethereum;
            if ( !metamask ) {
                dispatch( alertActions.setType('error') );
                dispatch( alertActions.setMessage('Debe instalar metamask!') );
                dispatch( alertActions.setAlert(true) );
                return;
            };
            const provider = new ethers.providers.Web3Provider(metamask);
            if ( !selectedCollection ) {
                dispatch( alertActions.setType('error') );
                dispatch( alertActions.setMessage('Debe seleccionar una colección!') );
                dispatch( alertActions.setAlert(true) );
                return;
            };
            if ( !userAddress ) {
                dispatch( alertActions.setType('error') );
                dispatch( alertActions.setMessage('Debe conectarse con metamask!') );
                dispatch( alertActions.setAlert(true) );
                return;
            };
            const chain = await provider.getNetwork();
            const chainId = chain.chainId;
            if ( chainId !== 80001 ) {
                dispatch( alertActions.setType('error') );
                dispatch( alertActions.setMessage('Debe conectarse a la red de Mumbai!') );
                dispatch( alertActions.setAlert(true) );
                return;
            };
            const artContract = new ethers.Contract(artAddress, artABI, provider.getSigner());
            const isAdmin = await artContract.admin(userAddress);
            if ( !isAdmin ) {
                dispatch( alertActions.setType('error') );
                dispatch( alertActions.setMessage('Debe ser un admin!') );
                dispatch( alertActions.setAlert(true) );
                return;
            };
            if ( quantity === '' ) {
                dispatch( alertActions.setType('error') );
                dispatch( alertActions.setMessage('Debe ingresar una cantidad!') );
                dispatch( alertActions.setAlert(true) );
                return;
            };
            const quantityCondition = quantity < selectedCollection.qtyAvailable;
            if ( !quantityCondition ) {
                dispatch( alertActions.setType('error') );
                dispatch( alertActions.setMessage('La cantidad ingresada es mayor que la disponible de la colección!') );
                dispatch( alertActions.setAlert(true) );
                return;
            };
            const goldContract = new ethers.Contract(goldAddress, goldABI, provider.getSigner());
	        const usdcContract = new ethers.Contract(usdcAddress, usdcABI, provider.getSigner());
            const isUserAllowanceSufficient = await getUserAllowance(usdcContract);
            if ( !isUserAllowanceSufficient ) {
                dispatch( alertActions.setType('error') );
                dispatch( alertActions.setMessage('No posee suficiente allowance!') );
                dispatch( alertActions.setAlert(true) );
                handleAllowanceModal();
                return;
            };
            const mintTransaction = await goldContract.mint(userAddress, quantity, selectedCollection.id);
            await mintTransaction.wait();
            await updateUserInfo(usdcContract);
            dispatch( alertActions.setType('success') );
            dispatch( alertActions.setMessage('Mint completado!') );
            dispatch( alertActions.setAlert(true) );
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <section className={styles.infoContainer}>
            <div className={styles.infoBlockContainer}>
                <div className={styles.cardInfoBlock}>
                    <span className={styles.parameter}>Nombre</span>
                    <span className={styles.value}>{selectedCollection ? selectedCollection.name : '---'}</span>
                </div>
                <div className={styles.cardInfoBlock}>
                    <span className={styles.parameter}>Pureza</span>
                    <span className={styles.value}>{selectedCollection ? `${selectedCollection.purity}` : '---'} %</span>
                </div>
                <div className={styles.cardInfoBlock}>
                    <span className={styles.parameter}>GRC</span>
                    <span className={styles.value}>{selectedCollection ? `${selectedCollection.qtyAvailable}` : '---'}</span>
                </div>
                <div className={styles.cardInfoBlock}>
                    <span className={styles.parameter}>Cantidad GRC</span>
                    <input 
                        className={styles.qtyInput} 
                        type="text"
                        value={quantity}
                        onChange={quantityOnChange}
                        placeholder="Ingrese cantidad" 
                        spellCheck="false"
                    />
                </div>
                <div className={styles.cardInfoBlock}>
                    <span className={styles.parameter}>Mantenimiento</span>
                    <span className={styles.value}>{prices ? threeDecimalFormat(prices.maintenancePrice) : (loading ? 'cargando...' : '---')}</span>
                </div>
                <div className={styles.cardInfoBlock}>
                    <span className={styles.parameter}>Mint</span>
                    <span className={styles.value}>{prices ? threeDecimalFormat(prices.mintPrice) : (loading ? 'cargando...' : '---')}</span>
                </div>
            </div>
            <div className={styles.mintContainer}>
                <button onClick={mint}>MINT</button>
            </div>
        </section>
    );
};