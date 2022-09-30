import styles from '../../../../assets/components/relevanteSection.module.css';

export default function RelevanteSection() {
    return (
        <section className={styles.relevante}>
            <table>
                <tbody>
                    <tr>
                        <td className={styles.greytd} colSpan='2'>OTRA INFORMACIÓN RELEVANTE</td>
                    </tr>
                    <tr>
                        <td>{'<Fecha >'}</td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}