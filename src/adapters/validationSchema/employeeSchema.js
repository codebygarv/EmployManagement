import * as Yup from 'yup';

export const employeeSchema = Yup.object({
    firstName: Yup.string().required('Please Enter the First Name'),
    lastName: Yup.string().required('Please Enter the Last Name'),
    email: Yup.string().email('Invalid Email Format').required('Please Enter the Email'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .required('Please Enter the Password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please Confirm Your Password'),
    contact: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
        .required('Please Enter the Phone Number'),
    salary: Yup.number()
        .positive('Salary must be a positive number')
        .required('Please Enter the Salary'),
});
