import styles from '../../../../assets/components/provenienciaTable.module.css';

export default function ProvenienciaSection() {
    return (
        <section className={styles.provenienciaTable}>
            <table>
                <tbody>
                    <tr>
                        <td className={styles.greytd} colSpan='4'>PROVENIENCIA / REGISTRO <span className={styles.greyspace}>|</span>DE PROPIEDAD</td>
                    </tr>
                    <tr>
                        <td>{'<Fecha Adquisicion>'}</td>
                        <td>Comprador Original / Colección</td>
                        <td>País</td>
                        <td>Información vendedor / Galería</td>
                    </tr>
                    <tr>
                        <td>{'<Fecha Adquisicion>'}</td>
                        <td>Comprador Original / Colección</td>
                        <td>País</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>{'<Fecha Adquisicion>'}</td>
                        <td>Comprador Original / Colección</td>
                        <td>País</td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.disclaimer}>
                <span>Disclaimer 3 - Provenance - VERTICAL</span>
            </div>
        </section>
    )
}