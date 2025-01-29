import { CCard, CCardBody, CCardHeader, CCol, CContainer, CFormInput, CRow } from '@coreui/react'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { employeeSchema } from '../../adapters/validationSchema/employeeSchema'
import { departmentList } from '../../adapters/actions/departmentAction';
import { useDispatch, useSelector } from 'react-redux'
import { employeeAddAction, employeeEditAction, employeeIndividualAction } from '../../adapters/actions/employeeAction'
import { headers } from '../../adapters/helpers/header'

const EmployeeAdd = () => {
    const { id } = useParams();
    const departmentListTotal = useSelector((state) => state.department?.departmentData?.data?.total) || 0;
    const departmentListing = useSelector((state) => state.department?.departmentData?.data?.result) || [];
    const employeeAddSuccess = useSelector((state) => state.employee.success);
    const employeeEditSuccess = useSelector((state) => state.employee.success);
    const employeeLoading = useSelector((state) => state.employee.loading);

    const [initialValue, setInitialValue] = useState({
        profileImg: '',
        firstName: '',
        lastName: '',
        accountType: 'Employee',
        jobRole: '',
        department: '',
        contact: '',
        salary: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [params, setParams] = useState({
        limit: departmentListTotal,
        page: 1,
    });

    const fetchDepartmentListData = () => {
        let queryParams = { ...params };
        queryParams = Object.fromEntries(Object.entries(queryParams).filter(([_, value]) => value !== null && value !== ''));
        dispatch(departmentList(queryParams));
    };

    const validationSchema = employeeSchema;

    const onSubmit = async (data) => {

        if (id) {
            await dispatch(employeeEditAction(id, data, headers.token));
            if (employeeEditSuccess) {
                navigate('/employee');
            } else {
                alert('Failed to Update Employee');
            }
        } else {
            await dispatch(employeeAddAction(data, headers.token));
            if (employeeAddSuccess) {
                navigate('/employee');
            } else {
                alert('Failed to Add Employee');
            }
        }
    }

    useEffect(() => {
        fetchDepartmentListData();
    }, [params]);

    useEffect(() => {
        if (id) {
            dispatch(employeeIndividualAction(id, headers.token)).then((response) => {
                if (response) {
                    console.log(response);
                    setInitialValue({
                        profileImg: response?.data?.details?.profileImg || '',
                        firstName: response?.data?.details?.firstName || '',
                        lastName: response?.data?.details?.lastName || '',
                        accountType: response?.data?.details?.accountType || '',
                        jobRole: response?.data?.jobRole || '',
                        department: response?.data?.department || '',
                        contact: response?.data?.contact || '',
                        salary: response?.data?.salary || '',
                        email: response?.data?.details?.email || '',
                        password: response?.data?.details?.password || '',
                        confirmPassword: response?.data?.details?.password || '',
                    });
                }
            })
        }
    }, [id])

    return (
        <Formik
            initialValues={initialValue}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <CContainer >
                    <CRow className='justify-content-center'>
                        <CCol md={9}>
                            <CCard>
                                <CCardHeader>
                                    {id ? <h4>Edit Employee</h4> : <h4>Add Employee</h4>}
                                </CCardHeader>
                                <CCardBody>
                                    <form className="row g-3" onSubmit={handleSubmit}>
                                        <div className="col-12">
                                            <label htmlFor="profileImg" className="form-label">ProfileImg URL</label>
                                            <CFormInput
                                                type="text"
                                                id="profileImg"
                                                name='profileImg'
                                                value={values.profileImg}
                                                onChange={handleChange}
                                                invalid={touched.profileImg && !!errors.profileImg}
                                                feedbackInvalid={errors.profileImg}
                                                placeholder='Enter the Profile Imahe URl'
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                            <CFormInput
                                                type="text"
                                                id="firstName"
                                                name='firstName'
                                                value={values.firstName}
                                                onChange={handleChange}
                                                invalid={touched.firstName && !!errors.firstName}
                                                feedbackInvalid={errors.firstName}
                                                placeholder='Enter the First Name'
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                            <CFormInput
                                                type="text"
                                                id="lastName"
                                                name='lastName'
                                                value={values.lastName}
                                                onChange={handleChange}
                                                invalid={touched.lastName && !!errors.lastName}
                                                feedbackInvalid={errors.lastName}
                                                placeholder='Enter the Last Name'
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="accountType" className="form-label">Account Type</label>
                                            <CFormInput
                                                type="text"
                                                id="accountType"
                                                name='accountType'
                                                value={values.accountType}
                                                onChange={handleChange}
                                                invalid={touched.accountType && !!errors.accountType}
                                                feedbackInvalid={errors.accountType}
                                                disabled
                                            />
                                        </div>


                                        <div className="col-12">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <CFormInput
                                                type="email"
                                                id="email"
                                                name='email'
                                                value={values.email}
                                                onChange={handleChange}
                                                invalid={touched.email && !!errors.email}
                                                feedbackInvalid={errors.email}
                                                placeholder='Enter the Email'
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <CFormInput
                                                type="password"
                                                id="password"
                                                name='password'
                                                value={values.password}
                                                onChange={handleChange}
                                                invalid={touched.password && !!errors.password}
                                                feedbackInvalid={errors.password}
                                                placeholder='Enter the Password'
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                            <CFormInput
                                                type="password"
                                                id="confirmPassword"
                                                name='confirmPassword'
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                invalid={touched.confirmPassword && !!errors.confirmPassword}
                                                feedbackInvalid={errors.confirmPassword}
                                                placeholder='Enter the confirmPassword'
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="contact" className="form-label">Phone</label>
                                            <CFormInput
                                                type="number"
                                                id="contact"
                                                name='contact'
                                                value={values.contact}
                                                onChange={handleChange}
                                                invalid={touched.contact && !!errors.contact}
                                                feedbackInvalid={errors.contact}
                                                placeholder='Enter the Phone Number'
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="salary" className="form-label">Salary</label>
                                            <CFormInput
                                                type="number"
                                                id="salary"
                                                name='salary'
                                                value={values.salary}
                                                onChange={handleChange}
                                                invalid={touched.salary && !!errors.salary}
                                                feedbackInvalid={errors.salary}
                                                placeholder='Enter the Salary'
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="department" className="form-label">Select Department</label>
                                            <select
                                                id="department"
                                                name="department"
                                                className="form-select"
                                                value={values.department}
                                                onChange={handleChange}
                                            >
                                                <option disabled >Choose Department</option>
                                                {
                                                    departmentListing.map((department, index) => {
                                                        return (
                                                            <option>{department.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="jobRole" className="form-label">Job Role</label>
                                            <CFormInput
                                                type="text"
                                                id="jobRole"
                                                name='jobRole'
                                                value={values.jobRole}
                                                onChange={handleChange}
                                                invalid={touched.jobRole && !!errors.jobRole}
                                                feedbackInvalid={errors.jobRole}
                                                placeholder='Enter the Job Role'
                                            />
                                        </div>

                                        <div className="col-12" style={{ display: 'flex', justifyContent: 'end' }}>
                                            <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>
                                                {employeeLoading ? 'Loading...' : id ? 'Update' : 'Add'}
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
    )
}

export default EmployeeAdd