import styles from '../../../../assets/components/extraImagesSection.module.css';

export default function ExtraImagesSection({ imagenReverso, imagenInscripcion }) {
    return (
        <section className={styles.extraPics}>
            <div className={styles.left}>
                <table>
                    <tbody>
                        <tr>
                            <td className={styles.image} rowSpan='11'>
                                <div className={styles.imagen}>
                                    <img src={imagenReverso} alt=''/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <span style={{'fontSize': '10px', 'color': 'grey'}}>Reverso</span>
            </div>
            <div className={styles.right}>
                <div className={styles.imagen}>
                    <img src={imagenInscripcion} alt='' />
                </div>
                <span style={{'fontSize': '10px', 'color': 'grey'}}>Inscripción / Firma</span>
            </div>
        </section>
    )
}