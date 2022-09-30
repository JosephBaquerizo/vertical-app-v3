import styles from '../assets/layouts/Header.module.css';
import { maybeFixMetamaskConnection } from '../services/web3/utils';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../services/store/slices/userSlice';
import { alertActions } from '../services/store/slices/alertSlice';
import { FaRegUserCircle } from 'react-icons/fa';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import cls from 'classnames';

export default function Header() {

    const userAddress = useSelector((state) => state.user.address);
    const dispatch = useDispatch();
    const [sidebarActive, setSidebarActive] = useState(false);

    const connectWallet = async () => {
        const metamask = window.ethereum;
        try {
            const accounts = await metamask.request({ method: "eth_requestAccounts" });
            if ( accounts.length ) {
                const account = accounts[0];
                console.log(account);
                dispatch( userActions.setAddress(account));
            }
        } catch(error) {
            if ( error.code !== 4001 ) {
                dispatch( alertActions.setType('error') );
                if ( !metamask ) {
                    dispatch( alertActions.setMessage('You need to install metamask!') );
                } else {
                    dispatch( alertActions.setMessage('Oops! Looks like something happened.') );
                }
                dispatch( alertActions.setAlert(true) );
            }
        }
    }

    useEffect(() => {
        maybeFixMetamaskConnection();
        const metamask = window.ethereum;
        if ( metamask ) {
            metamask.on('accountsChanged', async (accounts) => {
                if (accounts.length > 0) {
                    dispatch(userActions.setAddress(accounts[0]));
                } else {
                    dispatch(userActions.removeUser());
                }
            })
        };
        
    }, [userAddress, dispatch]);

    return (
        <div className={styles.headerContainer}>
            <div className={styles.header}>
                <Link to='/' className={styles.linkContainer}>
                    <span className={styles.logo}>VERTICAL</span>
                </Link>
                <nav className={sidebarActive ? styles.headerContainerNavAppear : styles.headerContainerNav}>
                    <ul>
                        <li>
                            <Link to='/gold' className={styles.linkContainer}>
                                <span>Gold</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/art' className={styles.linkContainer}>
                                <span>Art</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/certificates' className={styles.linkContainer}>
                                <span>Certificates</span>
                            </Link>
                        </li>
                        <li>
                            { 
                                userAddress 
                                ?
                                <Link to='/profile'>
                                    <FaRegUserCircle className={styles.icon}/>
                                </Link>
                                : 
                                <button onClick={connectWallet}>CONNECT</button> 
                            }
                        </li>
                    </ul>
                </nav>
                {
                    sidebarActive
                    ?
                    <AiOutlineClose className={styles.iconNav} onClick={() => setSidebarActive(false)} />
                    :
                    <AiOutlineMenu className={styles.iconNav} onClick={() => setSidebarActive(true)} />
                }
            </div>
        </div>
    )
}