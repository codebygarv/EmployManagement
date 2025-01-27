import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  useColorModes,
} from '@coreui/react'
import { Formik } from 'formik';
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { authConstant } from '../../adapters/constants/authConstant';
// import logo from 'src/assets/brand/logo.svg'
import { loginSchema } from '../../adapters/validationSchema/LoginSchema';
import { authService } from '../../adapters/services/authService';
import toast from 'react-hot-toast';

const Login = () => {
  const authState = useSelector((state) => state.auth);
  const [authLoading, setAuthLoading] = useState(false);
  const { colorMode, setColorMode } = useColorModes()
  let navigate = useNavigate();

  const validationSchema = loginSchema

  const initialValue = {
    email: '',
    password: '',
  };

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setAuthLoading(true);
    dispatch({ type: authConstant.SIGNIN_REQUEST });
    await authService.signIn("/auth/login", data)
      .then((response) => {
        if (response?.status === 200) {
          setAuthLoading(false);
          dispatch({ type: authConstant.SIGNIN_SUCCESS, payload: response.data });
          toast.success('Login Successfully!');
        } else {
          setAuthLoading(false);
          toast.error(response.data.message);
          dispatch({ type: authConstant.SIGNIN_FAILURE, payload: response?.data });
        }
      }).catch((error) => {
        toast.error(error?.response?.data?.message);
        setAuthLoading(false);
        dispatch({ type: authConstant.SIGNIN_FAILURE, payload: error?.response?.data });
      });
  };

  useEffect(() => {
    // dispatch({ type: authConstant.SIGNIN_SUCCESS, payload: {} })
    document.title = 'EMS | Login';
    if (colorMode !== 'light') {
      setColorMode('light')
    }

    if (authState.auth) {
      navigate("/dashboard");
    }
  }, [authState.auth, colorMode, setColorMode]);

  return (
    <div className="bg-body-tertiary min-vh-100  d-flex flex-row align-items-center">
      <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md={6}>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm onSubmit={handleSubmit} >
                        <div className='mx-auto' style={{ width: '150px' }}>
                          {/* <img src={logo} alt="Logo" height={45} /> */}
                        </div>
                        <p className="text-body-secondary">Please sign in to continue</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          {/* <CFormInput placeholder="Username" autoComplete="username" /> */}
                          <CFormInput
                            type="email"
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            invalid={touched.email && !!errors.email}
                            aria-describedby="validationCustom03Feedback"
                            feedbackInvalid={errors.email}
                            placeholder='Username'
                          />
                          {/* <CInvalidFeedback>{errors.email}</CInvalidFeedback> */}
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            type="password"
                            id="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            invalid={touched.password && !!errors.password}
                            aria-describedby="validationCustom03Feedback"
                            feedbackInvalid={errors.password}
                            placeholder='Password'
                          />
                        </CInputGroup>
                        {/* <span className='text-danger'>{errors.password}</span> */}
                        <CRow style={{ justifyContent: 'end', marginLeft: '30%' }}>
                          {authLoading ?
                            <CButton color="primary" className="px-2 xt-2" type="submit" disabled style={{ width: '100px' }}>Loading...</CButton>
                            :
                            <CButton color="primary" className="px-4 xt-3" type="submit" style={{ width: '100px' }}>Login</CButton>
                          }
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        )
        }
      </Formik >
    </div >
  )
}

export default Login
