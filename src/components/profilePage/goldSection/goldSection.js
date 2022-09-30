import styles from '../../../assets/components/goldSection.module.css';
import GoldCard from '../../goldCard/goldCard';
import LoadingSpinner from '../../loadingSpinner/loadingSpinner';

export default function GoldSection({ goldTokens, loading }) {

    return (
        <div className={styles.goldTokenContainer}>
            <div className={styles.grid}>
                {
                    goldTokens.length
                    ?
                    goldTokens.map((goldToken, index) => {
                        return <GoldCard key={index} goldTokenInfo={goldToken} />
                    })
                    :
                    (
                        loading
                        ?
                        <LoadingSpinner />
                        :
                        <span>No items for display</span>
                    )
                }
            </div>
        </div>
    );
};