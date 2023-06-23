import * as yup from 'yup';

export const LoginScheme = yup.object().shape({
    email: yup
        .string()
        .email('Некорректный email')
        .required('Поле является обязательным'),
    password: yup.string().required('Поле является обязательным'),
});

export const RegisterScheme = yup.object().shape({
    first_name: yup.string().required('Поле является обязательным'),
    last_name: yup.string().required('Поле является обязательным'),
    email: yup
        .string()
        .required('Поле является обязательным')
        .email('Некорректный email'),
    phone: yup
        .string()
        .required('Поле является обязательным')
        .matches(
            /^\+?\d{1,3}-?\d{3}-?\d{3}-?\d{2}-?\d{2}$/,
            'Некорректный номер телефона',
        ),
    password: yup
        .string()
        .required('Поле является обязательным')
        .min(6, 'Пароль должен состоять минимум из 6 символов'),
});

export const TeamScheme = yup.object().shape({
    name: yup.string().required('Поле является обязательным'),
    code: yup
        .string()
        .min(6, 'Адресс должен состоять минимум из 6 символов')
        .required('Поле является обязательным'),
});

export const UserDataScheme = yup.object().shape({
    first_name: yup.string().required('Поле является обязательным'),
    last_name: yup.string().required('Поле является обязательным'),
    email: yup
        .string()
        .required('Поле является обязательным')
        .email('Некорректный email'),
});

export const PasswordScheme = yup.object().shape({
    password: yup.string().required('Поле является обязательным'),
    new_password: yup
        .string()
        .required('Поле является обязательным')
        .min(6, 'Пароль должен состоять минимум из 6 символов'),
    password_confirmation: yup
        .string()
        .required('Поле является обязательным')
        .oneOf([yup.ref('new_password')], 'Пароли должны совпадать'),
});

export const SectionScheme = yup.object().shape({
    name: yup
        .string()
        .min(5, 'Заголовок должен быть как минимум из 5 символов')
        .required('Вы не ввели название раздела'),
});


export const ArticleScheme = yup.object().shape({
    name: yup
        .string()
        .min(5, 'Заголовок должен быть как минимум из 5 символов')
        .required('Вы не ввели название статьи'),
    section_id: yup.number().required('Вы не выбрали раздел'),
});
