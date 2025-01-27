import { CCard, CCardHeader, CCardFooter, CCardBody, CCardImage, CCardTitle, CCardText, CButton, CRow, CCol } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { employeeListAction } from '../../adapters/actions/employeeAction';
import { headers } from '../../adapters/helpers/header';

const EmployeeList = () => {
    const employeeListData = useSelector((state) => state.employee?.employees.data.result) || [];
    const employeeListLoading = useSelector((state) => state.employee?.loading) || false;
    const dispatch = useDispatch();

    const [params, setParams] = useState({
        limit: 6,
        page: 1,
    });

    console.log(employeeListData);

    const fetchEmployeeListData = () => {
        let queryParams = { ...params };
        queryParams = Object.fromEntries(Object.entries(queryParams).filter(([_, value]) => value !== null && value !== ''));
        dispatch(employeeListAction(queryParams));
    };

    useEffect(() => {
        fetchEmployeeListData();
    }, []);

    return (
        <>
            <CCard>
                <CCardHeader className="text-center fw-bold">All Employees</CCardHeader>
                <CCardBody>
                    <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
                        {
                            employeeListLoading ? <div>Loading...</div> :
                                employeeListData.map((employee, index) => (
                                    <CCol key={index}>
                                        <CCard>
                                            <CCardImage
                                                component="img"
                                                orientation="top"

                                                src={employee?.details?.profileImg}
                                                style={{ height: '100px', width: '100px', borderRadius: '50%' }}
                                                alt="Card image cap"
                                            />
                                            <CCardBody>
                                                <CCardTitle>{employee?.details?.firstName}</CCardTitle>
                                                <CCardText>{employee?.jobRole}</CCardText>
                                                <CCardText>Today's status: </CCardText>
                                                <CButton color="primary">View</CButton>
                                            </CCardBody>

                                        </CCard>
                                    </CCol>
                                ))
                        }
                    </CRow>
                </CCardBody>
            </CCard>
        </>
    )
}

export default EmployeeList