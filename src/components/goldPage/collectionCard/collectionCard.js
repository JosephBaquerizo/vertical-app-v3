import styles from '../../../assets/components/collectionCard.module.css';
import { mintcardActions } from '../../../services/store/slices/mintcardSlice';
import { useSelector, useDispatch } from 'react-redux';
import { handleCollectionName } from '../../../services/utils/utils';
import cls from 'classnames';

export default function CollectionCard({ collectionInfo }) {

    const selectedCollection = useSelector((state) => state.mintcard.info);
    const dispatch = useDispatch();
    const { id, name, creationDate, purity, qtyAvailable, weight } = collectionInfo;

    const handleClick = () => {
        if (selectedCollection) {
            if (selectedCollection.id !== id) {
                dispatch(mintcardActions.setMintCard(collectionInfo));
            } else {
                dispatch(mintcardActions.removeMintCard());
            };
        } else {
            dispatch(mintcardActions.setMintCard(collectionInfo));
        };
    };

    const condition = () => {
        if (selectedCollection.id === collectionInfo.id) {
            return cls(styles.collectionCard, styles.isSelected);
        }
        return styles.collectionCard;
    };

    return (
        <div className={selectedCollection ? condition() : styles.collectionCard} onClick={handleClick}>
            <div className={styles.infoBlock}>
                <span className={styles.id}>{id}</span>
            </div>
            <div className={styles.infoBlock}>
                <span className={styles.name}>{handleCollectionName(name)}</span>
            </div>
            <div className={styles.infoBlock}>
                <span className={styles.parameter}>Creation Date</span>
                <span className={styles.value}>{creationDate}</span>
            </div>
            <div className={styles.infoBlock}>
                <span className={styles.parameter}>Purity</span>
                <span className={styles.value}>{purity}%</span>
            </div>
            <div className={styles.infoBlock}>
                <span className={styles.parameter}>Available</span>
                <span className={styles.value}>{qtyAvailable}/{weight} grs</span>
            </div>
        </div>
    );
};