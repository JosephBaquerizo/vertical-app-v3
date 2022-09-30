import styles from '../../assets/components/alert.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { alertActions } from '../../services/store/slices/alertSlice';

export default function Alert() {

    const alert = useSelector((state) => state.alert);
    const dispatch = useDispatch();

    const closeAlert = () => {
        dispatch( alertActions.setAlert(false));
    };

    return (
        <>
        {
            alert.show
            &&
            <div className={styles.alert}>
                <div className={styles.message}>
                    <span>{alert.message}</span>
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={closeAlert}>CLOSE</button>
                </div>
            </div>
        }
        </>
    )
}