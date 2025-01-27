import * as Yup from 'yup';

export const departmenSchema = Yup.object({
    name: Yup.string().required('Please Enter the Department Name'),
    description: Yup.string().required('Please Enter the Department Description'),
});