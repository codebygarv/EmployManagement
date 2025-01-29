import { CCard, CCardHeader, CCardFooter, CCardBody, CCardImage, CCardTitle, CCardText, CButton, CRow, CCol, CFormInput } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { employeeListAction } from '../../adapters/actions/employeeAction';
import './Employee.css';
import { Link } from 'react-router-dom';
import { employeeService } from '../../adapters/services/employeeService';
import { headers } from '../../adapters/helpers/header';
import Delete from '../../components/deletePopup/Delete';
import toast from 'react-hot-toast';
import Pagination from '../pagination/pagination';

const EmployeeList = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [visible, setVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const employeeListData = useSelector((state) => state.employee?.employees?.data?.result) || [];
    const employeeListLoading = useSelector((state) => state.employee?.loading) || false;
    const employeeListTotal = useSelector((state) => state.employee?.employees?.data?.total) || 0;
    const dispatch = useDispatch();

    const [params, setParams] = useState({
        limit: 8,
        page: 1,
    });

    console.log(employeeListData);

    const fetchEmployeeListData = () => {
        let queryParams = { ...params };
        queryParams = Object.fromEntries(Object.entries(queryParams).filter(([_, value]) => value !== null && value !== ''));
        dispatch(employeeListAction(queryParams));
    };

    const handleDelete = async (id) => {
        try {
            await employeeService.employeeDeleteService(`/employee/remove/${id}`, headers.token);
            toast.success('Employee deleted successfully');
            fetchEmployeeListData();
        } catch (error) {
            toast.error(error.message || "Error deleting employee");
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredEmployees = employeeListData.filter((employee) =>
        employee.details.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.jobRole.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= Math.ceil(employeeListTotal / params.limit)) {
            setParams((prev) => ({ ...prev, page }));
        }
    };


    useEffect(() => {
        fetchEmployeeListData();
    }, [params]);

    return (
        <>
            <CCard style={{ marginBottom: '20px' }}>
                <CCardHeader className="text-center fw-bold">All Employees</CCardHeader>

                <CCardBody>
                    <CRow className="mb-4" style={{ marginBottom: '10px' }}>
                        <CCol xs={12} md={6} className="mb-2 mb-md-0">
                            <CFormInput
                                type="search"
                                placeholder="Search Employees By Name & Job Role"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </CCol>
                        <CCol xs={12} md={6} className="text-md-end">
                            <Link to='/employee/add'>
                                <CButton color='secondary'>Add Employee</CButton>
                            </Link>
                        </CCol>
                    </CRow>
                    <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
                        {
                            employeeListLoading ? <div>Loading...</div> :
                                filteredEmployees.length > 0 ? filteredEmployees.map((employee, index) => (
                                    <CCol key={index} style={{ width: '300px' }}>
                                        <CCard className='employee-card'>
                                            <CCardImage
                                                component="img"
                                                orientation="top"
                                                className='employee-card-image'
                                                src={employee?.details?.profileImg}
                                                alt="Card image cap"
                                            />
                                            <CCardBody className='employee-card-body-text'>
                                                <CCardTitle>{employee?.details?.firstName}</CCardTitle>
                                                <CCardText>{employee?.jobRole}</CCardText>

                                                <CRow>
                                                    <CCol> <Link to={`/employee/view/${employee._id}`}><CButton color='secondary' style={{ color: 'white', borderRadius: '20px' }} >View</CButton></Link></CCol>
                                                    <CCol><Link to={`/employee/edit/${employee._id}`}><CButton color='secondary' style={{ color: 'white', borderRadius: '20px' }}>Edit</CButton></Link></CCol>
                                                    <CCol><CButton color='secondary' style={{ color: 'white', borderRadius: '20px' }} onClick={() => {
                                                        setSelectedId(employee._id);
                                                        setVisible(true);
                                                    }}>Delete</CButton></CCol>
                                                </CRow>
                                            </CCardBody>

                                            <CCardFooter className='employee-card-body-footer'>
                                                {employee?.jobRole}
                                            </CCardFooter>
                                        </CCard>
                                    </CCol>
                                )) : <div>No Employees found</div>
                        }
                    </CRow>
                </CCardBody>

                <Pagination
                    handlePageChange={handlePageChange}
                    currentPage={params.page}
                    totalPages={Math.ceil(employeeListTotal / params.limit)}
                />
            </CCard>

            <Delete
                visible={visible}
                setVisible={setVisible}
                onDelete={() => handleDelete(selectedId)}
            />


        </>
    )
}

export default EmployeeList