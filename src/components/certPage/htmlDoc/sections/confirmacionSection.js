import styles from '../../../../assets/components/confirmacionSection.module.css';
import logoConfImg from '../../../../assets/images/logoConf.png';
import signatureImg from '../../../../assets/images/signature.png';

export default function ConfirmacionSection({ autor }) {
    return (
        <section className={styles.confirmacion}>
            <span>El artista abajo firmamente acredita mediante este certificado que la obra en mención constituye una obra única, original y auténtica de autoría de Manuel Rendón Seminario. 
                Todos los derechos de autor y reproducción están reservados por el artista.-
            </span>
            <div className={styles.firmaSection}>
                <div className={styles.left}>
                    <div className={styles.upper}>
                        <div className={styles.signatureImageContainer}>
                            <img src={signatureImg} alt='' />
                        </div>
                    </div>
                    <div className={styles.lower}>
                        <span>{autor.toUpperCase()}</span>
                    </div>
                </div>
                <div className={styles.center}>
                    <div className={styles.logoImageContainer}>
                        <img src={logoConfImg} alt='' />
                    </div>
                </div>
                <div className={styles.right}>
                    <span>El presente certificado ha sido emitido formalmente por VERTICAL SOCIEDAD DEL ARTE, de conformidad con los protocolos y procedimientos internos, basados
                        en estándares de calidad y transparencia; la información consignada en él ha sido la proporcionada por el Artista/Experto Certificador. VERTICAL <span className={styles.whitespace}>|</span>SOCIEDAD DE
                        ARTE no intervino en los procesos de creación, revisión ni autenticación de la obra aqui certificada, los cuales fueron de exclusiva autoría del Artista/Experto
                        certificador.</span>
                </div>
            </div>
        </section>
    )
}