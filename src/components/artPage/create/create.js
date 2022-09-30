import styles from '../../../assets/components/createArt.module.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import { artAddress } from '../../../services/web3/contracts/addresses';
import artABI from '../../../services/web3/contracts/abi/artABI.json';
import { FaCloudUploadAlt } from 'react-icons/fa';

export default function Create() {

    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        owner: '',
        price: '',
        title: '',
        imagen: '',
    });

    const handleInput = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const submitForm = async () => {
        setLoading(true);
        const metamask = window.ethereum;
        if ( metamask ) {
            try {
                const provider = new ethers.providers.Web3Provider(metamask);
                const artContract = new ethers.Contract(artAddress, artABI, provider.getSigner());
                const createArtworkTransaction = await artContract.createArtWork(values.owner, values.price, values.title);
                const transactionReceipt = await createArtworkTransaction.wait();
                const tokenId = Number(transactionReceipt.events[0].args[2]);
                console.log('tokenId',tokenId);
                const response = await fetch("https://vertical.tokenit.xyz/backend/webServices/storeDataNFT.php", {
                    method: "POST",
                    body: JSON.stringify({
                        nftId: tokenId,
                        nftImage: values.imagen
                    }),
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                });
                const responseJSON = await response.json();
                console.log(responseJSON);
            } catch(error) {
                console.log(error);
            }
        }
        setLoading(false);
    }

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
        if (reader.readyState === 2) {
            setValues({...values, [e.target.name]: reader.result});
        }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    return (
        <div className={styles.form}>
            <form>
                <span className={styles.title}>Create Art Token</span>
                <div className={styles.formBlock}>
                    <label htmlFor='owner'>Owner Name</label>
                    <input type='text' id='owner' name='owner' onChange={handleInput}/>
                </div>
                <div className={styles.formBlock}>
                    <label htmlFor='title'>Title</label>
                    <input type='text' id='title' name='title' onChange={handleInput}/>
                </div>
                <div className={styles.formBlock}>
                    <label htmlFor='price'>Price</label>
                    <input type='number' id='price' name='price' onChange={handleInput}/>
                </div>
                <div className={styles.imageContainer}>
                    <div className={styles.imageContainerTitle}>
                        <span>Vista Frontal</span>
                    </div>
                    <div className={styles.imageSection}>
                    {
                        values.imagen
                        ?
                        <div className={styles.image}>
                            <img alt='' src={values.imagen} />
                        </div>
                        :
                        <>
                            <FaCloudUploadAlt className={styles.icon} />
                            <span>No se ha seleccionado un archivo</span>
                        </>
                    }
                    </div>
                </div>
                {
                    values.imagen
                    ?
                    <button onClick={() => setValues({...values, imagen: ''})}>Remover</button>
                    :
                    <>
                        <input id='imagen' className={styles.defaultFrontalBtn} type='file' accept='image/*' name='imagen' onChange={imageHandler} />
                        <label htmlFor='imagen' className={styles.label}>Upload Image</label>
                    </>
                }
            </form>
            <button className={styles.submitButton} onClick={submitForm}>{loading ? "Loading..." : "CREATE"}</button>
        </div>
    )
}