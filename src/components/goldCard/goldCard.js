import styles from '../../assets/components/goldCard.module.css';
import { threeDecimalFormat, epochToDate, handleCollectionName } from '../../services/utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import { goldcardActions } from '../../services/store/slices/goldcardSlice';
import { ethers } from 'ethers';
import cls from 'classnames';

export default function GoldCard({ goldTokenInfo, enableClick=false }) {

    const { id, collectionName, creationDate, purity, weight, estimatedPrice } = goldTokenInfo;

    const selectedGoldCards = useSelector((state) => state.goldcard.selectedCards);
    const dispatch = useDispatch();

    const handleClick = () => {
        if ( selectedGoldCards.includes(id)) {
            const newSelectedCards = selectedGoldCards.filter((obj) => obj !== id);
            dispatch(goldcardActions.setCards(newSelectedCards));
        } else {
            dispatch(goldcardActions.setCards([...selectedGoldCards, id]));
        }
    };

    return (
        <div className={enableClick ? (selectedGoldCards.includes(id) ? styles.goldCard : cls(styles.goldCard, styles.isSelected)) : styles.goldCard} onClick={enableClick ? handleClick : () => null}>
            <div className={styles.infoBlock}>
                <span>{id}</span>
            </div>
            <div className={styles.infoBlock}>
                <span>{handleCollectionName(collectionName)}</span>
            </div>
            <div className={styles.infoBlock}>
                <span>Creation Date</span>
                <span>{epochToDate(creationDate)}</span>
            </div>
            <div className={styles.infoBlock}>
                <span>Purity</span>
                <span>{purity / 100}</span>
            </div>
            <div className={styles.infoBlock}>
                <span>Weight</span>
                <span>{weight}</span>
            </div>
            <div className={styles.infoBlock}>
                <span>Estimated Price</span>
                <span>{threeDecimalFormat(ethers.utils.formatEther(estimatedPrice))}</span>
            </div>
        </div>
    );
};