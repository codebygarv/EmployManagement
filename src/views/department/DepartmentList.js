import {
    CTable,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTableBody,
    CTableDataCell,
    CCard,
    CCardBody,
    CCardHeader,
    CRow,
    CButton,
    CCol,
    CFormInput,
    CCardTitle,
    CCardText,
    CContainer
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { departmentList } from '../../adapters/actions/departmentAction';
import { headers } from '../../adapters/helpers/header';
import { Link } from 'react-router-dom';
import Delete from '../../components/deletePopup/Delete';
import { departmentService } from '../../adapters/services/departmentService';
import toast from 'react-hot-toast';
import Pagination from '../pagination/pagination';

const DepartmentList = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [visible, setVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [randomImages, setRandomImages] = useState('');
    const dispatch = useDispatch();

    const departmentListing = useSelector((state) => state.department?.departmentData?.data?.result) || [];
    const departmentListTotal = useSelector((state) => state.department?.departmentData?.data?.total) || 0;
    const departmentLoading = useSelector((state) => state.department?.loading);

    const [params, setParams] = useState({
        limit: 6,
        page: 1,
    });

    const randomImage = () => {
        const images = [
            'https://cdn-icons-png.flaticon.com/512/8347/8347215.png',
            'https://img.freepik.com/premium-vector/cartoon-people-icon-comic-style-users-illustration-pictogram-teamwork-person-sign-splash-business-concept_157943-4266.jpg',
            'https://img.freepik.com/premium-vector/performance-icon-comic-style-career-vector-cartoon-illustration-white-isolated-background-people-with-arrow-business-concept-splash-effect_157943-5841.jpg',
            'https://cdn-icons-png.flaticon.com/512/8347/8347215.png'
        ];
        return images[Math.floor(Math.random() * images.length)];
    };

    const fetchDepartmentListData = () => {
        let queryParams = { ...params };
        queryParams = Object.fromEntries(Object.entries(queryParams).filter(([_, value]) => value !== null && value !== ''));
        dispatch(departmentList(queryParams));
    };

    useEffect(() => {
        fetchDepartmentListData();
    }, [params]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredDepartments = departmentListing.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id) => {
        try {
            await departmentService.departmentDeleteService(`/department/delete/${id}`, headers.token);
            toast.success('Department deleted successfully');
            fetchDepartmentListData();
        } catch (error) {
            toast.error(error.message || "Error deleting department");
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= Math.ceil(departmentListTotal / params.limit)) {
            setParams((prev) => ({ ...prev, page }));
        }
    };

    return (
        <CCard>
            <CCardHeader className="text-center fw-bold">All Departments</CCardHeader>
            <CCardBody>
                <CRow className="mb-4" style={{marginBottom:'10px'}}>
                    <CCol xs={12} md={6} className="mb-2 mb-md-0">
                        <CFormInput
                            type="search"
                            placeholder="Search departments..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </CCol>
                    <CCol xs={12} md={6} className="text-md-end">
                        <Link to='/department/add'>
                            <CButton color='primary'>Add Department</CButton>
                        </Link>
                    </CCol>
                </CRow>

                <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
                    {departmentLoading ? (
                        <CTableRow>
                            <CTableDataCell colSpan={5} className="text-center">Loading...</CTableDataCell>
                        </CTableRow>
                    ) : filteredDepartments.length > 0 ? (
                        filteredDepartments.map((item, index) => (

                            <CCol key={index} >
                                <CCard>
                                    <CCardBody style={{ display: 'flex' }}>
                                        <CContainer>
                                            <img src={randomImage()} alt="department" style={{ width: '100%', height: '150px' }} />
                                        </CContainer>
                                        <CContainer>
                                            <CCardTitle>{item.name}</CCardTitle>
                                            <CCardText>{item.description}</CCardText>
                                            <CCardText>{item.__v}</CCardText>
                                            <Link to={`/department/edit/${item._id}`}><CButton color="info" style={{ marginRight: '10px', borderRadius: '20px', color: 'white' }}>edit</CButton></Link>
                                            <CButton color="danger"
                                                style={{ borderRadius: '20px', color: 'white' }}
                                                onClick={() => {
                                                    setSelectedId(item.id);
                                                    setVisible(true);
                                                }}>Delete</CButton>
                                        </CContainer>
                                    </CCardBody>
                                </CCard>
                            </CCol>

                        ))
                    ) : (
                        "No departments found"
                    )}
                </CRow >

                <Pagination
                    handlePageChange={handlePageChange}
                    currentPage={params.page}
                    totalPages={Math.ceil(departmentListTotal / params.limit)}
                />
            </CCardBody>

            <Delete
                visible={visible}
                setVisible={setVisible}
                onDelete={() => handleDelete(selectedId)}
            />
        </CCard>
    );
};

export default DepartmentList;
