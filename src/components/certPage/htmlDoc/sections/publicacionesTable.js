import styles from '../../../../assets/components/publicacionesTable.module.css';

export default function PublicacionesSection() {
    return (
        <section className={styles.publicacionesTable}>
            <table>
                <tbody>
                    <tr>
                        <td className={styles.greytd} colSpan='3'>INFORMACIÓN PUBLICACIONES <span className={styles.greyspace}>__</span>/ EXHIBICIONES <span className={styles.greyspace}>|</span>/ MUESTRAS</td>
                    </tr>
                    <tr>
                        <td>{'<Fecha >'}</td>
                        <td>Información</td>
                        <td>Ciudad, País</td>
                    </tr>
                    <tr>
                        <td>{'<Fecha >'}</td>
                        <td>Información</td>
                        <td>Ciudad, País</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}