import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react';
import './delete.css';

const Delete = (props) => {
    return (
        <>
            <CModal
                alignment="center"
                visible={props.visible}
                onClose={() => props.setVisible(false)}
                aria-labelledby="VerticallyCenteredExample"
            // data-mdb-backdrop="false"
            >
                <CModalBody>
                    Are You sure You want to delete ?
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger text-white" onClick={() => { props.onDelete(); props.setVisible(false) }}>Yes</CButton>
                    <CButton color="secondary" onClick={() => props.setVisible(false)}>
                        No
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default Delete