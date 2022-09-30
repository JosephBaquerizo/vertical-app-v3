import styles from '../../../assets/components/htmlDoc.module.css';
import { jsPDF } from "jspdf";
import UpperSection from './sections/upperSection';
import MainUpperSection from './sections/mainUpperSection';
import TableOneSection from './sections/tableOneSection';
import ExtraImagesSection from './sections/extraImagesSection';
import ConfirmacionSection from './sections/confirmacionSection';
import DatosExtraSection from './sections/datosExtraSection';
import VerticalFooter from './sections/verticalFooter';
import ProvenienciaSection from './sections/provenienciaTable';
import PublicacionesSection from './sections/publicacionesTable';
import RelevanteSection from './sections/relevanteSection';
import ArtistaSection from './sections/artistaSection';
import DisclaimerSection from './sections/disclaimerSection';
import html2canvas from 'html2canvas';

export default function HtmlDoc({ info }) {

    const {
        alto,
        ancho,
        ano,
        autor,
        categoria,
        coleccion,
        estado,
        hash,
        imagenFirma,
        imagenFrontal,
        imagenInscripcion,
        imagenReverso,
        inscripcion,
        lugar,
        notas,
        tecnica,
        titulo,
        unidades
    } = info;

    console.log(imagenFrontal)

    const savePDF = () => {
        const doc = new jsPDF('p', 'pt', 'a4');
        const margin = 10;
        const certificate = document.querySelector('#doc');
        const scale = (doc.internal.pageSize.width - margin * 2) / certificate.offsetWidth;
        doc.internal.write(0, "Tw");
        doc.html(certificate, {
            x: margin,
            y: margin,
            html2canvas: {
                scale: scale,
                allowTaint: true,
            },
            callback: function(doc) {
                doc.output('save', { filename: 'certificado.pdf' });
            }
        })
    }

    return (
        <div className={styles.container}>

            <main className={styles.art}>
                <div className={styles.buttonContainer}>
                    <button onClick={savePDF}>DESARGAR PDF</button>
                </div>
                <div className={styles.documentContainer}>
                    <div id='doc' className={styles.document}>
                        <UpperSection />
                        <MainUpperSection titulo={titulo} autor={autor} ano={ano}/>
                        <TableOneSection 
                            titulo={titulo}
                            autor={autor}
                            lugar={lugar}
                            ano={ano}
                            coleccion={coleccion}
                            categoria={categoria}
                            ancho={ancho}
                            alto={alto}
                            unidades={unidades}
                            inscripcion={inscripcion}
                            tecnica={tecnica}
                            estado={estado}
                            notas={notas}
                            imagenFrontal={imagenFrontal}
                        />
                        <ExtraImagesSection imagenReverso={imagenReverso} imagenInscripcion={imagenInscripcion}/>
                        <ConfirmacionSection autor={autor}/>
                        <DatosExtraSection hash={hash} />
                        <VerticalFooter />
                        <div className={styles.pageJump}>
                        </div>
                        <UpperSection />
                        <ProvenienciaSection />
                        <PublicacionesSection />
                        <RelevanteSection />
                        <ArtistaSection />
                        <DisclaimerSection />
                        <VerticalFooter />
                    </div>
                </div>
            </main>

        </div>
    )
}