import styles from '../../../../assets/components/upperSection.module.css';

export default function UpperSection() {
    return (
        <section className={styles.upper}>
            <div className={styles.left}>
                <div className={styles.block}>
                    <div className={styles.parameterContainer}>
                        <span className={styles.parameter}>Código / Numeración</span>
                    </div>
                    <span className={styles.value}>VSA01104231A001</span>
                </div>
                <div className={styles.block}>
                    <div className={styles.parameterContainer}>
                        <span className={styles.parameter}>Ref. VERTICAL</span>
                    </div>
                    <span className={styles.value}>MRS001 <span className={styles.whitespace}>|</span>- 2022</span>
                </div>
            </div>
            <div className={styles.right}>
                <span className={styles.title}>VERTICAL</span>
                <span className={styles.subtitle}>Sociedad del Arte</span>
            </div>
        </section>
    )
}