import { CButton, CCard, CCardBody, CCardHeader, CCardImage, CCardText, CCol, CRow } from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { employeeIndividualAction } from '../../adapters/actions/employeeAction';
import { headers } from '../../adapters/helpers/header';
import { Link, useParams } from 'react-router-dom';

const EmployeeView = () => {
    const { id } = useParams();
    const employeePersonalData = useSelector((state) => state.employee?.employeeIndividual?.data?.details) || {};
    const employeeData = useSelector((state) => state.employee?.employeeIndividual?.data) || {};
    const employeeLoading = useSelector((state) => state.employee?.loading) || false;
    const dispatch = useDispatch();
    console.log(employeePersonalData);

    const fetchEmployeeData = (id) => {
        dispatch(employeeIndividualAction(id, headers.token));
    }

    useEffect(() => {
        if (id) {
            fetchEmployeeData(id);
        }
    }, [id])

    return (
        <>
            <CCard style={{ marginBottom: '20px' }}>
                <CCardHeader className="text-center fw-bold">Employee Details</CCardHeader>
                <CCardBody>
                    {
                        employeeLoading ? <div>Loading...</div> :
                            <div>
                                <CCardImage component="img" orientation="top" className='employee-card-image' src={employeePersonalData?.profileImg} style={{ marginLeft: '570px' }} />
                                <CCardText><strong>FirstName:  </strong>{employeePersonalData?.firstName}</CCardText>
                                <CCardText><strong>LastName:  </strong>{employeePersonalData?.lastName}</CCardText>
                                <CCardText><strong>Job Role:  </strong>{employeeData?.jobRole}</CCardText>
                                <CCardText><strong>Email:  </strong>{employeePersonalData?.email}</CCardText>
                                <CCardText><strong>Password:  </strong>{employeePersonalData?.password}</CCardText>
                                <CCardText><strong>Phone:  </strong>{employeeData?.contact}</CCardText>
                                <CCardText><strong>salary:  </strong>{employeeData?.salary} Rupees</CCardText>
                                <CCardText><strong>Joining Date:  </strong>{employeeData?.createdAt}</CCardText>
                                <br />
                                <CCardText style={{ textAlign: 'center' }}><strong>Department Details</strong></CCardText>
                                <CCardText><strong>Department Name:  </strong>{employeeData?.department?.name}</CCardText>
                                <CCardText><strong>Department Description:  </strong>{employeeData?.department?.description}</CCardText>
                                <CCardText><strong>Department Status:  </strong>{employeeData?.department?.status ? '🟢 Active' : '🔴 InActive'}</CCardText>

                                <CRow>
                                    <CCol style={{ display: 'flex', justifyContent: 'end' }}>
                                        <Link to='/employee'><CButton color='secondary' style={{ borderRadius: '20px' }}>Back</CButton></Link>
                                    </CCol>
                                </CRow>
                            </div>
                    }
                </CCardBody>
            </CCard>
        </>
    )
}

export default EmployeeView