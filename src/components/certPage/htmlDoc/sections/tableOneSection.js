import styles from '../../../../assets/components/tableOneSection.module.css';

export default function TableOneSection({ imagenFrontal, titulo, autor, lugar, ano, coleccion, categoria, ancho, alto, unidades, inscripcion, tecnica, estado, notas }) {
    return (
        <section className={styles.table1}>
            <table>
                <tbody>
                    <tr>
                        <td className={styles.image} rowSpan='11'>
                            <div className={styles.imagen}>
                                <img src={imagenFrontal} alt='' />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.parameter}>Autor</td>
                        <td className={styles.value}>{autor}</td>
                    </tr>
                    <tr>
                        <td className={styles.parameter}>Título</td>
                        <td className={styles.value}>{titulo}</td>
                    </tr>
                    <tr>
                        <td className={styles.parameter}>Lugar y año</td>
                        <td className={styles.value}>{lugar} <span className={styles.whitespace}>|</span>,{ano}</td>
                    </tr>
                    <tr>
                        <td className={styles.parameter}>Colección <span className={styles.whitespace}>|</span>/ serie</td>
                        <td className={styles.value}>{coleccion}</td>
                    </tr>
                    <tr>
                        <td className={styles.parameter}>Categoría</td>
                        <td className={styles.value}>categoria</td>
                    </tr>
                    <tr>
                        <td className={styles.parameter}>Dimensión</td>
                        <td className={styles.value}>{ancho} x {alto} {unidades}</td>
                    </tr>
                    <tr>
                        <td className={styles.parameter}>Inscripción</td>
                        <td className={styles.value}>{inscripcion}</td>
                    </tr>
                    <tr>
                        <td className={styles.parameter}>Técnica <span className={styles.whitespace}>|</span>y soporte</td>
                        <td className={styles.value}>{tecnica}</td>
                    </tr>
                    <tr>
                        <td className={styles.parameter}>Estado <span className={styles.whitespace}>|</span>de conservación</td>
                        <td className={styles.value}>{estado}</td>
                    </tr>
                    <tr>
                        <td className={styles.parameter}>Notas</td>
                        <td className={styles.value}>{notas}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}