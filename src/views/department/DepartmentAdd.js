import { CCard, CCardBody, CCardHeader, CCol, CContainer, CFormInput, CRow } from '@coreui/react'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { departmenSchema } from '../../adapters/validationSchema/DepartmentSchema'
import { useDispatch, useSelector } from 'react-redux'
import { departmentAdd, departmentEdit, departmentEditDetails } from '../../adapters/actions/departmentAction'
import { headers } from '../../adapters/helpers/header'

const DepartmentAdd = () => {
    const { id } = useParams();
    const departmentSuccess = useSelector((state) => state.department.success);
    const departmentLoading = useSelector((state) => state.department.loading);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const [initialValue, setInitialValue] = useState({
        name: '',
        description: '',
        status: 'true'  // Default value to avoid empty string issues
    });

    const validationSchema = departmenSchema;

    const onSubmit = async (data) => {
        // Ensure `status` is sent as a Boolean
        const formattedData = {
            ...data,
            status: data.status === 'true' // Convert string to Boolean
        };

        if (id) {
            await dispatch(departmentEdit(id, formattedData, headers.token));
            if (departmentSuccess) {
                navigate('/department');
            } else {
                navigate(`/department/edit/${id}`);
            }
        } else {
            await dispatch(departmentAdd(formattedData, headers.token));
            if (departmentSuccess) {
                navigate('/department');
            } else {
                navigate('/department/add');
            }
        }
    };

    useEffect(() => {
        if (id) {
            dispatch(departmentEditDetails(id, headers.token)).then((response) => {
                if (response) {
                    setInitialValue({
                        name: response?.data?.name || '',
                        description: response?.data?.description || '',
                        status: response?.data?.status ? 'true' : 'false'
                    });
                }
            });
        }
    }, [id]);

    return (
        <Formik
            initialValues={initialValue}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <CContainer>
                    <CRow className='justify-content-center'>
                        <CCol md={9}>
                            <CCard>
                                <CCardHeader>
                                    {id ? <h4>Edit Department</h4> : <h4>Add Department</h4>}
                                </CCardHeader>
                                <CCardBody>
                                    <form className="row g-3" onSubmit={handleSubmit}>
                                        {/* Department Name */}
                                        <div className="col-12">
                                            <label htmlFor="department-name" className="form-label">Department Name</label>
                                            <CFormInput
                                                type="text"
                                                id="department-name"
                                                name='name'
                                                value={values.name}
                                                onChange={handleChange}
                                                invalid={touched.name && !!errors.name}
                                                feedbackInvalid={errors.name}
                                                placeholder='Enter the Department Name'
                                            />
                                        </div>

                                        {/* Department Description */}
                                        <div className="col-12">
                                            <label htmlFor="department-description" className="form-label">Department Description</label>
                                            <CFormInput
                                                type="text"
                                                id="department-description"
                                                name='description'
                                                value={values.description}
                                                onChange={handleChange}
                                                invalid={touched.description && !!errors.description}
                                                feedbackInvalid={errors.description}
                                                placeholder='Enter the Department Description'
                                            />
                                        </div>

                                        {/* Status Dropdown */}
                                        <div className="col-12">
                                            <label htmlFor="inputState" className="form-label">Status</label>
                                            <select
                                                id="inputState"
                                                name="status"
                                                className="form-select"
                                                value={values.status}
                                                onChange={handleChange}
                                            >
                                                <option value="true">🟢 Active</option>
                                                <option value="false">🔴 Inactive</option>
                                            </select>
                                        </div>

                                        {/* Buttons */}
                                        <div className="col-12" style={{ display: 'flex', justifyContent: 'end' }}>
                                            <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>
                                                {departmentLoading ? 'Loading...' : id ? 'Update' : 'Add'}
                                            </button>
                                            <Link to='/department'>
                                                <button type="button" className="btn btn-secondary">Back</button>
                                            </Link>
                                        </div>
                                    </form>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            )}
        </Formik>
    );
};

export default DepartmentAdd;