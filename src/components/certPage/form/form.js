import styles from '../../../assets/components/form.module.css';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import cls from 'classnames';
import { alertActions } from '../../../services/store/slices/alertSlice';

export default function Form() {

    const dispatch = useDispatch();
    const [values, setValues] = useState({
        autor: '',
        titulo: '',
        lugar: '',
        ano: '',
        coleccion: '',
        categoria: '',
        ancho: '',
        largo: '',
        unidades: 'centimetros',
        inscripcion: '',
        tecnica: '',
        estado: '',
        notas: '',
        imagenFrontal: '',
        imagenReverso: '',
        imagenInscripcion: '',
        imagenFirma: ''
    });

    const handleInput = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
        if (reader.readyState === 2) {
            setValues({...values, [e.target.name]: reader.result});
        }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const crearCertificado = async () => {
      const arreglo = Object.values(values);
      let isEmpty = false;
      for (let i=0; i< arreglo.length; i++) {
        if (arreglo[i] === '') {
          isEmpty = true;
        }
      }
      if (!isEmpty) {
        try {
          await fetch("https://vertical.tokenit.xyz/backend/webServices/storeData.php", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          });
          setValues({
            autor: '',
            titulo: '',
            lugar: '',
            ano: '',
            coleccion: '',
            categoria: '',
            ancho: '',
            largo: '',
            unidades: 'centimetros',
            inscripcion: '',
            tecnica: '',
            estado: '',
            notas: '',
            imagenFrontal: '',
            imagenReverso: '',
            imagenInscripcion: '',
            imagenFirma: ''
          });
          dispatch( alertActions.setType('success') );
          dispatch( alertActions.setMessage('No se ha podido crear el certificado correctamente. Pruebe más luego.') );
          dispatch( alertActions.setAlert(true) );
        } catch(error) {
          dispatch( alertActions.setType('error') );
          dispatch( alertActions.setMessage('No se ha podido crear el certificado correctamente. Pruebe más luego.') );
          dispatch( alertActions.setAlert(true) );
        }
      } else {
          dispatch( alertActions.setType('error') );
          dispatch( alertActions.setMessage('Debe completar todos los campos') );
          dispatch( alertActions.setAlert(true) );
      }
    }

    return (
        <section className={styles.formContainer}>
          <span className={styles.title}>Crear certificado de arte</span>
          <form>
            <div className={styles.formBlock}>
              <label htmlFor='autor'>Autor</label>
              <input type='text' id='autor' name='autor' onChange={handleInput} />
            </div>
            <div className={styles.formBlock}>
              <label htmlFor='titulo'>Titulo</label>
              <input type='text' id='titulo' name='titulo' onChange={handleInput} />
            </div>
            <div className={styles.formPair}>
              <div className={cls(styles.doubleItem, styles.formBlock)}>
                <label htmlFor='lugar'>Lugar</label>
                <input type='text' id='lugar' name='lugar' onChange={handleInput} />
              </div>
              <div className={cls(styles.doubleItem, styles.formBlock)}>
                <label htmlFor='ano'>Año</label>
                <input type='number' id='year' name='ano' onChange={handleInput} />
              </div>
            </div>
            <div className={styles.dimensiones}>
              <div className={styles.subtitleContainer}>
                <span className={styles.subtitle}>Dimensiones</span>
              </div>
              <div className={styles.formTriple}>
                <div className={cls(styles.tripleItem, styles.formBlock)}>
                  <label htmlFor='ancho'>Ancho</label>
                  <input type='number' id='ancho' name='ancho' onChange={handleInput} />
                </div>
                <div className={cls(styles.tripleItem, styles.formBlock)}>
                  <label htmlFor='largo'>Largo</label>
                  <input type='number' id='largo' name='largo' onChange={handleInput} />
                </div>
                <div className={cls(styles.tripleItem, styles.formBlock)}>
                  <label htmlFor='unidades'>Unidades</label>
                  <select id="unidades" name="unidades" onChange={handleInput}>
                    <option value="centímetros">centímetros</option>
                    <option value="pulgadas">pulgadas</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.formBlock}>
              <label htmlFor='coleccion'>Coleccion/serie</label>
              <input type='text' id='coleccion' name='coleccion' onChange={handleInput} />
            </div>
            <div className={styles.formPair}>
              <div className={cls(styles.doubleItem, styles.formBlock)}>
                <label htmlFor='categoria'>Categoria</label>
                <input type='text' id='categoria' name='categoria' onChange={handleInput} />
              </div>
              <div className={cls(styles.doubleItem, styles.formBlock)}>
                <label htmlFor='inscripcion'>Inscripcion</label>
                <input type='text' id='inscripcion' name='inscripcion' onChange={handleInput} />
              </div>
            </div>
            <div className={styles.formPair}>
              <div className={cls(styles.doubleItem, styles.formBlock)}>
                <label htmlFor='tecnica'>Tecnica y soporte</label>
                <input type='text' id='tecnicaysoporte' name='tecnica' onChange={handleInput}/>
              </div>
              <div className={cls(styles.doubleItem, styles.formBlock)}>
                <label htmlFor='estado'>Estado de conservacion</label>
                <input type='text' id='estado' name='estado' onChange={handleInput} />
              </div>
            </div>
            <div className={styles.formBlock}>
              <label htmlFor='notas'>Notas</label>
              <textarea className={styles.textarea} id='notas' maxLength='300' rows='10' name='notas' onChange={handleInput}></textarea>
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.imageContainerTitle}>
                <span>Vista Frontal</span>
              </div>
              <div className={styles.imageSection}>
                {
                  values.imagenFrontal
                  ?
                  <div className={styles.image}>
                    <img alt='' src={values.imagenFrontal} />
                  </div>
                  :
                  <>
                    <FaCloudUploadAlt className={styles.icon} />
                    <span>No se ha seleccionado un archivo</span>
                  </>
                }
              </div>
              {
                values.imagenFrontal
                ?
                <button onClick={() => setValues({...values, imagenFrontal: ''})}>Remover</button>
                :
                <>
                  <input id='defaultFrontalBtn' className={styles.defaultFrontalBtn} type='file' accept='image/*' name='imagenFrontal' onChange={imageHandler} />
                  <label htmlFor='defaultFrontalBtn' className={styles.label}>Upload Image</label>
                </>
              }
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.imageContainerTitle}>
                <span>Vista Trasera</span>
              </div>
              <div className={styles.imageSection}>
              {
                  values.imagenReverso
                  ?
                  <div className={styles.image}>
                    <img alt='' src={values.imagenReverso} />
                  </div>
                  :
                  <>
                    <FaCloudUploadAlt className={styles.icon} />
                    <span>No se ha seleccionado un archivo</span>
                  </>
                }
              </div>
              {
                values.imagenReverso
                ?
                <button onClick={() => setValues({...values, imagenReverso: ''})}>Remover</button>
                :
                <>
                  <input id='defaultReversoBtn' className={styles.defaultFrontalBtn} type='file' accept='image/*' name='imagenReverso' onChange={imageHandler} />
                  <label htmlFor='defaultReversoBtn' className={styles.label}>Upload Image</label>
                </>
              }
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.imageContainerTitle}>
                <span>Inscripcion</span>
              </div>
              <div className={styles.imageSection}>
              {
                  values.imagenInscripcion
                  ?
                  <div className={styles.image}>
                    <img alt='' src={values.imagenInscripcion} />
                  </div>
                  :
                  <>
                    <FaCloudUploadAlt className={styles.icon} />
                    <span>No se ha seleccionado un archivo</span>
                  </>
                }
              </div>
              {
                values.imagenInscripcion
                ?
                <button onClick={() => setValues({...values, imagenInscripcion: ''})}>Remover</button>
                :
                <>
                  <input id='defaultFirmaBtn' className={styles.defaultFrontalBtn} type='file' accept='image/*' name='imagenInscripcion' onChange={imageHandler} />
                  <label htmlFor='defaultFirmaBtn' className={styles.label}>Upload Image</label>
                </>
              }
            </div>
          </form>
          <button className={styles.submitButton} onClick={crearCertificado}>CREAR</button>
        </section>
    )
}