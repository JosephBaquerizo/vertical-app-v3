import styles from '../../../assets/components/searchCert.module.css';
import SearchBar from '../../searchbar/searchbar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Search() {

    const [collection, setCollection] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [hashItem, setHashItem] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSearchChange = (e) => {
        setSearchField(e.target.value);
    }

    //9c11e9d3808a44e9bcb1e75486c144008dcfab79
    const handleSearchClick = async () => {
        /*try {
            const response = await fetch(`https://vertical.tokenit.xyz//backend/webServices/getData.php?hash=${searchField}`);
            const responseJSON = await response.json();
            setHashItem(responseJSON.data);
        } catch(error) {
            setHashItem(null);
            console.log(error);
        }*/
        console.log('no todavia');
    }

    useEffect(() => {

        const loadCollection = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://vertical.tokenit.xyz//backend/webServices/getData.php');
                const responseJSON = await response.json();
                return responseJSON.data;
            } catch(error) {
                console.log(error);
            }
        }

        loadCollection().then(function(response) {
            setCollection(response);
            setLoading(false);
        })

    }, []);

    return (
        <div className={styles.searchContainer}>
            <SearchBar searchField={searchField} onSearchChange={onSearchChange} placeholder='Enter hash to search certificates...' clickable={true} clickFunction={handleSearchClick}/>
            {
                collection.length
                ?
                <div className={styles.collectionContainer}>
                    {
                        collection.map((item, index) => {
                            return (
                                <Link key={index} to={`/certificates/${item.hash}`} className={styles.linkContainer}>
                                    <div className={styles.collectionItem}>
                                        <div className={styles.left}>
                                            <span className={styles.parameter}>Título</span>
                                            <span className={styles.title}>{item.titulo}</span>
                                            <span className={styles.parameter}>Autor</span>
                                            <span className={styles.autor}>{item.autor}</span>
                                            <span className={styles.parameter}>Lugar</span>
                                            <span>{item.lugar}</span>
                                            <span className={styles.parameter}>Año</span>
                                            <span>{item.ano}</span>
                                        </div>
                                        <div className={styles.right}>
                                            <img alt='' src={item.imagenFrontal} className={styles.image}/>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                :
                (
                    loading
                    ?
                    <div className={styles.loaderContainer}>
                        <span>Cargando...</span>
                        <div className={styles.loader}></div>
                    </div>
                    :
                    <div className={styles.noItems}>
                        <span>No items for display...</span>
                    </div>
                )
            }
        </div>
    )
}