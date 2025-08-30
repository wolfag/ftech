import * as yup from 'yup';

export const signupSchema = yup.object({
  // countryCode: yup.string().required(),
  // phone: yup
  //   .string()
  //   // .matches(/\d{10}/, 'Invalid phone number')
  //   .required('Please input your phone number'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Please input your email'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Please input your password'),
});
