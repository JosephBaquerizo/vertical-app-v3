import styles from '../../../../assets/components/datosExtra.module.css';
import cls from 'classnames';

export default function DatosExtraSection({ hash }) {
    return (
        <section className={styles.datosExtra}>
            <table>
                <tbody>
                    <tr>
                        <td className={cls(styles.greyFont, styles.firstColumn)}>Código / Numeración</td>
                        <td className={cls(styles.greyFont, styles.secondColumn)}>VSA01104231A001</td>
                        <td className={cls(styles.greyFont, styles.thirdColumn)}>Hash</td>
                        <td className={styles.fourthColumn}>{hash}</td>
                    </tr>
                    <tr>
                        <td className={cls(styles.greyFont, styles.firstColumn)}>Fecha emisión original</td>
                        <td className={cls(styles.greyFont, styles.secondColumn)}>2022<span className={styles.whitespace}>|</span> -09<span className={styles.whitespace}>|</span> -16</td>
                        <td className={cls(styles.greyFont, styles.thirdColumn)}>Timestamp</td>
                        <td className={styles.fourthColumn}>c23abcd87c - 6:29 a. m.16/9/22</td>
                    </tr>
                    <tr>
                        <td className={cls(styles.greyFont, styles.firstColumn)}>Fecha emisión de versión actual certificado</td>
                        <td className={cls(styles.greyFont, styles.secondColumn)}>2022<span className={styles.whitespace}>|</span> -09 -16</td>
                        <td className={cls(styles.greyFont, styles.thirdColumn)}>Otros VERTICAL</td>
                        <td className={cls(styles.greyFont, styles.fourthColumn)}>C798797ccc897977384</td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.qr}>
                <div className={styles.qrImage}>
                    <img src={`https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=http://vertical.tokenit.xyz/certificate/${hash}&choe=UTF-8`} alt='' />
                </div>
            </div>
        </section>
    )
}