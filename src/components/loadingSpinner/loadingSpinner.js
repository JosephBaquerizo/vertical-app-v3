import styles from '../../assets/components/loadingSpinner.module.css';

export default function LoadingSpinner() {
    return (
        <div className={styles.loaderContainer}>
            <span>Cargando...</span>
            <div className={styles.loader}></div>
        </div>
    )
}