import styles from '../assets/pages/DynamicCertificates.module.css';
import { useState, useEffect } from 'react';
import HtmlDoc from '../components/certPage/htmlDoc/htmlDoc';
import { useParams } from 'react-router-dom';

export default function DynamicCertificates() {

    const { id } = useParams();
    const [hashItem, setHashItem] = useState(null);

    useEffect(() => {

        const loadHtmlInfo = async () => {
            try {
                const response = await fetch(`https://vertical.tokenit.xyz//backend/webServices/getData.php?hash=${id}`);
                const responseJSON = await response.json();
                if (responseJSON.data.error) {
                    return;
                }
                return responseJSON.data;
            } catch(error) {
                console.log(error);
            }
        }

        loadHtmlInfo().then(function(respuesta) {
            setHashItem(respuesta);
        })

    }, [id]);

    return (
        <div className={styles.artContainer}>
            {
                hashItem
                ?
                <HtmlDoc info={hashItem}/>
                :
                <span>No info available</span>
            }
        </div>
    );
};