import styles from '../../../../assets/components/mainUpperSection.module.css';

export default function MainUpperSection({ titulo, autor, ano }) {
    return (
        <section className={styles.mainUpper}>
            <span className={styles.title}>CERTIFICADO <span className={styles.whitespace}>_</span>DE AUTENTICIDAD DE OBRA <span className={styles.whitespace}>|</span>DE ARTE</span>
            <span className={styles.description}>El presente documento <span className={styles.bold}>CERTIFICA</span> <span className={styles.whitespace}>|</span>que la Obra titulada <span className={styles.bold}>{titulo.toUpperCase()}</span> 
                de autoría de <span className={styles.bold}>{autor.toUpperCase()}</span> ({ano}), constituye una pieza única, original y auténtica, la misma que se describe 
                según el siguiente detalle técnico:</span>
        </section>
    )
}