import styles from '../../../../assets/components/artistaSection.module.css';

export default function ArtistaSection() {
    return (
        <section className={styles.artista}>
            <table>
                <tbody>
                    <tr>
                        <td className={styles.greytd} colSpan='2'>INFORMACIÓN ARTISTA</td>
                    </tr>
                    <tr>
                        <td>Breve reseña</td>
                        <td>Nacionalidad <br/>Nacimiento <br/>Trayectoria <br/>Reconocimientos</td>
                    </tr>
                    <tr>
                        <td>Información</td>
                        <td>Página web <br/>Redes sociales</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}