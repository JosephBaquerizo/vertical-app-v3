import styles from '../assets/pages/Certificate.module.css';
import Form from '../components/certPage/form/form';
import Search from '../components/certPage/search/search';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Certificates() {

    const userAddress = useSelector((state) => state.user.address);
    const [toggleSection, setToggleSection] = useState(true);

    const toggleToSearch = () => {
        setToggleSection(true);
    }

    const toggleToCreate = () => {
        setToggleSection(false);
    }

    return(
        <div className={styles.certificateContainer}>
            <h1>Certificates</h1>
            <div className={styles.buttonsContainer}>
                {
                    userAddress
                    &&
                    <>
                        <button className={!toggleSection ? styles.option : styles.selectedOption} onClick={toggleToSearch}>SEARCH</button>
                        <button className={!toggleSection ? styles.selectedOption : styles.option} onClick={toggleToCreate}>CREATE</button>
                    </>
                }
            </div>
            <div className={styles.contentContainer}>
                {
                    toggleSection
                    ?
                    <Search />
                    :
                    <Form />
                }
            </div>
        </div>
    )
}