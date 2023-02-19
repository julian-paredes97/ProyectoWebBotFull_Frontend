import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import styles from "./styles.module.scss"

const FullPageLoader = () => {
  return (
    <div className={styles.fpcontainer}>
        <Spinner animation="border" variant="success" className={styles.fploader} /> 
        <p className={styles.textp}>Procesando pedido...</p>
    </div>
  )
}

export default FullPageLoader;