import styles from '../../../assets/components/allowanceModal.module.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useSelector, useDispatch } from 'react-redux';
import { alertActions } from '../../../services/store/slices/alertSlice';
import { usdcAddress, goldAddress } from '../../../services/web3/contracts/addresses';
import usdcABI from '../../../services/web3/contracts/abi/usdcABI.json';

export default function AllowanceModal({ closeAllowanceModal }) {

    const [userUsdcData, setUserUsdcData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const userAddress = useSelector((state) => state.user.address);
    const dispatch = useDispatch();

    const approveAllowance = async () => {
        setLoading(true);
        const metamask = window.ethereum;
        if (metamask) {
            if (userAddress) {
                try {
                    const provider = new ethers.providers.Web3Provider(metamask);
                    const usdcContract = new ethers.Contract(usdcAddress, usdcABI, provider.gerSigner());
                    const balance = await usdcContract.balance(userAddress);
                    const usdcApprovalTransaction = await usdcContract.approve(goldAddress, balance);
                    await usdcApprovalTransaction.wait();
                } catch(error) {
                    dispatch( alertActions.setType('error') );
                    dispatch( alertActions.setMessage('Algo ha ocurrido. Prueba de nuevo más tarde.') );
                    dispatch( alertActions.setAlert(true) );
                }
            } else {
                dispatch( alertActions.setType('error') );
                dispatch( alertActions.setMessage('Debes conectarte con metamask.') );
                dispatch( alertActions.setAlert(true) );
            }
        } else {
            dispatch( alertActions.setType('error') );
            dispatch( alertActions.setMessage('Debes instalar metamask.') );
            dispatch( alertActions.setAlert(true) );
        }
        setLoading(false);
    };

    useEffect(() => {
        const loadUsdcBalanceAllowance = async () => {
            setLoadingData(true);
            if (userAddress) {
                try {
                    const provider = new ethers.providers.AlchemyProvider("maticmum",  process.env.ALCHEMY_API);
                    const usdcContract = new ethers.Contract(usdcAddress, usdcABI, provider);
                    const allowance = await usdcContract.allowance(userAddress, goldAddress);
                    const balance = await usdcContract.balance(userAddress);
                    return {
                        allowance: allowance,
                        balance: balance
                    }
                } catch(error) {
                    return null;
                }
            }
        }
        loadUsdcBalanceAllowance().then(function(response) {
            setUserUsdcData(response);
            setLoadingData(false);
        })
    }, [userAddress])

    // balance mayor que el allowance?

    return (
        <div className={styles.allowanceModal}>
            <div className={styles.top}>
                <button onClick={closeAllowanceModal}>x</button>
            </div>
            <span className={styles.title}>DEBES GESTIONAR TU ALLOWANCE PARA EL MINT</span>
            <span className={styles.description}>Aceptando, puedes usar tu allowance para el mint</span>
            <div className={styles.box}>
                <span className={styles.parameter}>Tu balance: </span>
                <span>{loadingData ? "cargando..." : (userUsdcData.balance ? userUsdcData.balance : '---')} USDC</span>
            </div>
            <div className={styles.box}>
                <span className={styles.parameter}>Tu allowance: </span>
                <span>{loadingData ? "cargando..." : (userUsdcData.allowance ? userUsdcData.allowance : '---')} USDC</span>
            </div>
            <button onClick={approveAllowance}>{loading ? "cargando..." : "APROBAR"}</button>
        </div>
    );
};