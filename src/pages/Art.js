import styles from '../assets/pages/Art.module.css';
import { useState } from 'react';
import Create from '../components/artPage/create/create';
import Search from '../components/artPage/search/search';

export default function Art() {

    const [toggleSection, setToggleSection] = useState(true);

    const toggleToSearch = () => {
        setToggleSection(true);
    }

    const toggleToCreate = () => {
        setToggleSection(false);
    }

    return (
        <div className={styles.artContainer}>
            <h1>Art NFT</h1>
            <div className={styles.buttonsContainer}>
                <button className={!toggleSection ? styles.option : styles.selectedOption} onClick={toggleToSearch}>SEARCH</button>
                <button className={!toggleSection ? styles.selectedOption : styles.option} onClick={toggleToCreate}>CREATE</button>
            </div>
            {
                toggleSection
                ?
                <Search />
                :
                <Create />
            }
        </div>
    )
}