import styles from '../assets/pages/DynamicArt.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { threeDecimalFormat, epochToDate } from '../services/utils/utils';
import ArtCard from '../components/artPage/artCard/artCard';
import { ethers } from 'ethers';
import { artAddress } from '../services/web3/contracts/addresses';
import artABI from '../services/web3/contracts/abi/artABI.json';
import { FaCloudUploadAlt } from 'react-icons/fa';
import SelectGoldModal from '../components/artPage/selectGoldModal/selectGoldModal';
import { alertActions } from '../services/store/slices/alertSlice';
import { useParams } from 'react-router-dom';

export default function DynamicArt() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const userAddress = useSelector((state) => state.user.address);
    const [artInfo, setArtInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [extraData, setExtraData] = useState(null);
    const [selectModal, setSelectModal] = useState(false);
    const [formInfo, setFormInfo] = useState({
        tipo: 'imagen',
        documento: '',
    })

    useEffect(() => {
        const loadArtInfo = async () => {
            setLoading(true);
            try {
                const provider = new ethers.providers.AlchemyProvider('maticmum', process.env.ALCHEMY_API);
                const artContract = new ethers.Contract(artAddress, artABI, provider);
                const tokenURI = await artContract.tokenURI(id);
                const base64 = tokenURI.slice(29);
                const decoded = atob(base64);
                const parsedInfo = JSON.parse(decoded);
                const infoMerged = {
                    description: parsedInfo.description,
                    creationDate: epochToDate(parsedInfo.attributes[0].value),
                    ownerName: parsedInfo.attributes[1].value,
                    estimatedPrice: parsedInfo.attributes[2].value,
                    goldSupport: threeDecimalFormat(parsedInfo.attributes[3].value),
                    image: parsedInfo.image,
                };
                return infoMerged;
            } catch(error) {
                return ;
            }
        };

        const loadDataExtra = async () => {
            if (id) {
                try {
                    const response = await fetch(`https://vertical.tokenit.xyz//backend/webServices/getExtraDataNFT.php?nftId=${id}`);
                    const responseJSON = await response.json();
                    const responseData = responseJSON.data;
                    const images = responseData.filter((item) => {
                        return item.docType === 'imagen';
                    });
                    const certs = responseData.filter((item) => {
                        return item.docType === 'documento';
                    })
                    const data = {
                        images,
                        certs
                    }
                    return data;
                } catch(error) {
                    return ;
                }
            }
        }

        loadArtInfo().then(function(response) {
            setArtInfo(response);
            setLoading(false);
        })

        loadDataExtra().then(function(response) {
            setExtraData(response);
        });
        
    }, []);

    const handleSelect = (e) => {
        setFormInfo({...formInfo, [e.target.name]: e.target.value});
    }

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
        if (reader.readyState === 2) {
            setFormInfo({...formInfo, [e.target.name]: reader.result});
        }
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const handleSubmit = async () => {
        try {
            console.log(formInfo.tipo);
            console.log(formInfo.documento);
            const response = await fetch("https://vertical.tokenit.xyz/backend/webServices/storeExtraDataNFT.php", {
                method: "POST",
                body: JSON.stringify({
                    nftId: id,
                    tipo: formInfo.tipo,
                    documento: formInfo.documento
                }),
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            });
            await response.json();
            dispatch( alertActions.setType('success') );
            dispatch( alertActions.setMessage('Registro exitoso!') );
            dispatch( alertActions.setAlert(true) );
        } catch(error) {
            dispatch( alertActions.setType('error') );
            dispatch( alertActions.setMessage('Algo ha ocurrido. Pruebe más tarde.') );
            dispatch( alertActions.setAlert(true) );
        }
    }

    const closeModal = () => {
        setSelectModal(false);
    }

    const activarAlerta = () => {
        dispatch( alertActions.setType('error') );
        dispatch( alertActions.setMessage('Opcion: "Agregar oro" inhabilitada!') );
        dispatch( alertActions.setAlert(true) );
    }

    return (
        <div className={styles.artContainer}>
            {
                selectModal
                &&
                <SelectGoldModal closeModal={closeModal} artTokenId={id}/>
            }
            <h1>Art NFT {id}</h1>
            {
                artInfo
                ?
                <div className={styles.general}>
                            <ArtCard artToken={artInfo}/>
                            <div className={styles.image}>
                                <img alt='' src={artInfo.image}/>
                            </div>
                            {
                                userAddress
                                &&
                                <div className={styles.userOptionsContainer}>
                                    <div className={styles.submenuContainer}>
                                        <span>Agregar Info Adicional</span>
                                        <div className={styles.infoBlock}>
                                        <label htmlFor='tipo'>Tipo</label>
                                            <select id="tipo" name="tipo" onChange={handleSelect}>
                                                <option value="imagen">imagen</option>
                                                <option value="documento">documento</option>
                                            </select>
                                        </div>
                                        {
                                            formInfo.tipo === 'imagen'
                                            ?
                                            <>
                                                <div className={styles.imageSection}>
                                                        {
                                                            formInfo.documento
                                                            ?
                                                            <div className={styles.image}>
                                                                <img alt='' src={formInfo.documento}/>
                                                            </div>
                                                            :
                                                            <>
                                                            <FaCloudUploadAlt className={styles.icon} />
                                                            <span>No se ha seleccionado un archivo</span>
                                                            </>
                                                        }
                                                </div>
                                                {
                                                formInfo.documento
                                                ?
                                                <button onClick={() => setFormInfo({...formInfo, documento: ''})}>Remover</button>
                                                :
                                                <>
                                                    <input id='imagen' type='file' className={styles.anotherImage} accept='image/*' name='documento' onChange={imageHandler} />  
                                                    <label htmlFor='imagen' className={styles.label}>Upload Image</label>
                                                </>
                                                }
                                            </>
                                            :
                                            <>
                                                <input id='documento' type='file' accept='application/pdf' name='documento' onChange={imageHandler} />
                                                <label htmlFor='documento' className={styles.label}>Upload Document</label>
                                            </>
                                        }
                                        <button className={styles.submitButton} onClick={handleSubmit}>Agregar archivo</button>
                                    </div>
                                    <div className={styles.addGoldContainer}>
                                        <h3>Add Gold</h3>
                                        <button onClick={activarAlerta}>SELECT GOLD TOKENS</button>
                                    </div>
                                </div>
                            }
                        {
                            extraData
                            ?
                            <div className={styles.dataExtraGeneralContainer}>
                                <div className={styles.dataExtraImagesContainer}>
                                    <h3>Images</h3>
                                    {
                                        extraData.images.map((item, index) => {
                                            return (
                                                <div className={styles.extraDataImage} key={index}>
                                                    <img alt='' src={`https://vertical.tokenit.xyz/NFT/extraData/images/${item.documento}`} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className={styles.dataExtraImagesContainer}>
                                    <h3>Certs</h3>
                                    <div className={styles.certsContainer}>
                                    {
                                        extraData.certs.map((item, index) => {
                                            return (
                                                <a className={styles.docTag} rel='noreferrer' target='_blank' key={index} href={`https://vertical.tokenit.xyz/NFT/extraData/certs/${item.documento}`}>{item.documento}</a>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                            </div>
                            :
                            <div className={styles.dataExtraImagesContainer}>
                                <span>No info to display</span>
                            </div>
                        }
                </div>
                :
                <span>loading</span>
            
            }
        </div>
    );
};