import styles from '../../../assets/components/artCard.module.css';
import { Link } from 'react-router-dom';

export default function ArtCard({ artToken }) {

    const { description, ownerName, creationDate, estimatedPrice, goldSupport, tokenId } = artToken;

    return (
        <Link to={`/art/${tokenId}`} className={styles.linkContainer}>
            <div className={styles.artcard}>
                <div className={styles.titleContainer}>
                    <span className={styles.artCardTitle}>{description}</span>
                </div>
                <div className={styles.block}>
                    <span className={styles.parameter}>Owner</span>
                    <span className={styles.value}>{ownerName}</span>
                </div>
                <div className={styles.block}>
                    <span className={styles.parameter}>Creation Date</span>
                    <span className={styles.value}>{creationDate}</span>
                </div>
                <div className={styles.block}>
                    <span className={styles.parameter}>Estimated Price</span>
                    <span className={styles.value}>{estimatedPrice} USDC</span>
                </div>
                <div className={styles.block}>
                    <span className={styles.parameter}>Gold Support</span>
                    <span className={styles.value}>{goldSupport} USDC</span>
                </div>
            </div>
        </Link>
    );
};