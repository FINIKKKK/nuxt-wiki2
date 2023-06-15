import * as yup from 'yup';

export const LoginScheme = yup.object().shape({
  email: yup
    .string()
    .email('Некорректный email')
    .required('Поле является обязательным'),
  password: yup.string().required('Поле является обязательным'),
});

export const RegisterScheme = yup.object().shape({
  name: yup.string().required('Поле является обязательным'),
  email: yup
    .string()
    .required('Поле является обязательным')
    .email('Некорректный email'),
  phone: yup
    .string()
    .required('Поле является обязательным')
    .email('Некорректный номер телефона'),
  password: yup
    .string()
    .required('Поле является обязательным')
    .min(6, 'Пароль должен состоять минимум из 6 символов'),
});
