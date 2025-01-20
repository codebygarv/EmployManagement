import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Please Enter the Username'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Please Enter the password'),
});