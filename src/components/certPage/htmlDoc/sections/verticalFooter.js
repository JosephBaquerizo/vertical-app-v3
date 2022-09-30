import styles from '../../../../assets/components/verticalFooter.module.css';

export default function VerticalFooter() {
    return (
        <section className={styles.footer}>
            <div className={styles.contentContainer}>
                <span className={styles.copyright}>Copyright © 2022 - VERTICAL <span className={styles.whitespace}> _ </span>SOCIARTE <span className={styles.whitespace}> _ </span>S.A.S todos los derechos reservados. VERTICAL <span className={styles.whitespace}> _ </span>SOCIEDAD <span className={styles.whitespace}> _ </span>DEL <span className={styles.whitespace}> _ </span>ARTE <span className={styles.whitespace}> _ </span>es una marca registrada.</span>
                <div className={styles.lowerContainer}>
                    <div className={styles.block}>
                        <span>www.verticalarte.com</span>
                        <span>info@verticalarte.com</span>
                    </div>
                    <div className={styles.block}>
                        <span>Calle Numa Pompillo Llona No.142</span>
                        <span>Barrio Las Penas - Guayaquil, Ecuador</span>
                    </div>
                    <span>Powered by <span className={styles.bold}>VERTICAL</span></span>
                </div>
            </div>
        </section>
    )
}