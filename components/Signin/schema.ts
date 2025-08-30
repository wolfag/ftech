import * as yup from 'yup';

export const signinSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .required('Please input your email'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Please input your password'),
});
