import { CPagination, CPaginationItem } from '@coreui/react'
import React from 'react'

const Pagination = (props) => {
    return (
        <div>
            <CPagination aria-label="Page navigation example" className='justify-content-end me-3'>
                <CPaginationItem
                    disabled={props.currentPage === 1}
                    onClick={() => props.handlePageChange(props.currentPage - 1)}
                >
                    Previous
                </CPaginationItem>
                {Array.from({ length: props.totalPages }, (_, index) => (
                    <CPaginationItem
                        key={index + 1}
                        active={props.currentPage === index + 1}
                        onClick={() => props.handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </CPaginationItem>
                ))}
                <CPaginationItem
                    disabled={props.currentPage === props.totalPages}
                    onClick={() => props.handlePageChange(props.currentPage + 1)}
                >
                    Next
                </CPaginationItem>
            </CPagination>
        </div>
    )
}

export default Pagination