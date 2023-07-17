import * as yup from 'yup';
import { useTranslate } from '~/hooks/useTranslate';

/**
 * --------------------------------
 * Схемы валидации
 * --------------------------------
 */
const $t = await useTranslate('validation', true);

/**
 * Авторизация
 */
export const LoginScheme = yup.object().shape({
  email: yup.string().email($t.email).required($t.required),
  password: yup.string().required($t.required),
});

/**
 * Регистрация
 */
export const RegisterScheme = yup.object().shape({
  first_name: yup.string().required($t.required),
  last_name: yup.string().required($t.required),
  email: yup.string().required($t.required).email($t.email),
  phone: yup
    .string()
    .required($t.required)
    .matches(/^\+?\d{1,3}-?\d{3}-?\d{3}-?\d{2}-?\d{2}$/, $t.phone),
  password: yup.string().required($t.required).min(6, $t.passsword),
});

/**
 * Восстановить пароль
 */
export const ResetPasswordScheme = yup.object().shape({
  email: yup.string().required($t.required).email($t.email),
});

/**
 * Создание команды
 */
export const TeamScheme = yup.object().shape({
  name: yup.string().required($t.required),
  code: yup.string().min(6, $t.address).required($t.required),
});

/**
 * Редактирование данных пользователя
 */
export const UserDataScheme = yup.object().shape({
  first_name: yup.string().required($t.required),
  last_name: yup.string().required($t.required),
  email: yup.string().required($t.required).email($t.email),
});

/**
 * Изменения пароля пользователя
 */
export const PasswordScheme = yup.object().shape({
  password: yup.string().required($t.required),
  new_password: yup.string().required($t.password).min(6, $t.passsword),
  password_confirmation: yup
    .string()
    .required($t.required)
    .oneOf([yup.ref('new_password')], $t.password_confirm),
});

/**
 * Создание раздела ----------------
 */
export const SectionScheme = yup.object().shape({
  name: yup.string().min(5, $t.section.title).required($t.section.required),
});

/**
 * Создание статьи
 */
export const ArticleScheme = yup.object().shape({
  name: yup.string().required($t.article.title),
  section_id: yup.number().required($t.article.section),
  tabs: yup.array().min(1, $t.article.tabs),
});

/**
 * Приглашение пользователей 1
 */
export const AddUsersScheme = yup.object().shape({
  emails: yup.array().min(1, $t.user),
});

/**
 * Приглашение пользователей 2
 */
export const AddUsersScheme2 = yup.object().shape({
  emails: yup
    .string()
    .required($t.required2)
    .test('valid-emails', $t.email, function (value) {
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
    }),
});
