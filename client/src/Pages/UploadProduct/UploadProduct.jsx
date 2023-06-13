import React from 'react'
import { Container } from 'react-bootstrap'
import styles from './uploadProduct.module.css'

function UploadProduct() {
    return (
        <div className={`${styles["dashboard-background"]} py-5`}>
                <Container className={'d-flex flex-column'}>
                    <h1>Upload Product</h1>
                </Container>
        </div>      
    )
}

export default UploadProduct