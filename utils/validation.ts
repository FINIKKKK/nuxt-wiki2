import * as yup from 'yup';

/**
 * --------------------------------
 * Схемы валидации
 * --------------------------------
 */

/**
 * Авторизация
 */
export const LoginScheme = yup.object().shape({
  email: yup
    .string()
    .email('Некорректный email')
    .required('Поле является обязательным'),
  password: yup.string().required('Поле является обязательным'),
});

/**
 * Регистрация
 */
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

/**
 * Создание команды
 */
export const TeamScheme = yup.object().shape({
  name: yup.string().required('Поле является обязательным'),
  code: yup
    .string()
    .min(6, 'Адресс должен состоять минимум из 6 символов')
    .required('Поле является обязательным'),
});

/**
 * Редактирование данных пользователя
 */
export const UserDataScheme = yup.object().shape({
  first_name: yup.string().required('Поле является обязательным'),
  last_name: yup.string().required('Поле является обязательным'),
  email: yup
    .string()
    .required('Поле является обязательным')
    .email('Некорректный email'),
});

/**
 * Изменения пароля пользователя
 */
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

/**
 * Создание раздела ----------------
 */
export const SectionScheme = yup.object().shape({
  name: yup
    .string()
    .min(5, 'Заголовок должен быть как минимум из 5 символов')
    .required('Вы не ввели название раздела'),
});

/**
 * Создание статьи
 */
export const ArticleScheme = yup.object().shape({
  name: yup.string().required('Вы не ввели название статьи'),
  section_id: yup.number().required('Вы не выбрали раздел'),
  tabs: yup.array().min(1, 'Вы не ввели информацию о статье'),
});

/**
 * Приглашение пользователей 1
 */
export const AddUsersScheme = yup.object().shape({
  emails: yup.array().min(1, 'Добавьте хотя бы одного пользователя'),
});

/**
 * Приглашение пользователей 2
 */
export const AddUsersScheme2 = yup.object().shape({
  emails: yup
    .string()
    .required('Прежде заполните поле')
    .test(
      'valid-emails',
      'Введите правильный адрес электронной почты',
      function (value) {
        if (!value) {
          // Поле пустое, ничего не вводили
          return true;
        }
        // Разделяем введенные адреса по запятой
        const emailList = value.split(',');
        // Проверяем каждый адрес на валидность
        const isValid = emailList.every((email) => {
          const trimmedEmail = email.trim();
          return yup.string().email().isValidSync(trimmedEmail);
        });
        return isValid;
      },
    ),
});
