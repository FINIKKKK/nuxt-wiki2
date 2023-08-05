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
  email: yup.string().email('email').required('required'),
  password: yup.string().required('required'),
});

/**
 * Регистрация
 */
export const RegisterScheme = yup.object().shape({
  first_name: yup.string().required('required'),
  last_name: yup.string().required('required'),
  email: yup.string().required('required').email('email'),
  phone: yup.string().required('required'),
  password: yup.string().required('required').min(6, 'password'),
});

/**
 * Восстановить пароль
 */
export const ResetPasswordScheme = yup.object().shape({
  email: yup.string().required('required').email('email'),
});

/**
 * Создание команды
 */
export const TeamScheme = yup.object().shape({
  name: yup.string().required('required'),
  code: yup.string().min(6, 'address').required('required'),
});

/**
 * Редактирование данных пользователя
 */
export const UserDataScheme = yup.object().shape({
  first_name: yup.string().required('required'),
  last_name: yup.string().required('required'),
  email: yup.string().required('required').email('email'),
});

/**
 * Изменения пароля пользователя
 */
export const PasswordScheme = yup.object().shape({
  password: yup.string().required('required'),
  new_password: yup.string().required('password').min(6, 'password'),
  password_confirmation: yup
    .string()
    .required('required')
    .oneOf([yup.ref('new_password')], 'password_confirm'),
});

/**
 * Создание раздела ----------------
 */
export const SectionScheme = yup.object().shape({
  name: yup.string().min(5, 'section_title').required('section_required'),
});

/**
 * Создание статьи
 */
export const ArticleScheme = yup.object().shape({
  name: yup.string().required('article_title'),
  section_id: yup.number().required('article_section'),
  tabs: yup.array().min(1, 'article_tabs'),
});

/**
 * Приглашение пользователей 1
 */
export const AddUsersScheme = yup.object().shape({
  emails: yup.array().min(1, 'user'),
});

/**
 * Приглашение пользователей 2
 */
export const AddUsersScheme2 = yup.object().shape({
  items: yup
    .string()
    .required('required2')
    .test('valid-emails', 'email', function (value) {
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

/**
 * Создание тэга
 */
export const TagScheme = yup.object().shape({
  name: yup.string().required('required').min(5, 'tag_min').max(30, 'tag_max'),
});

/**
 * Создание черновика
 */
export const ArticleDraftScheme = yup.object().shape({
  name: yup.string().required('article_title'),
  section_id: yup.number().required('article_section'),
});

/**
 * Создание группы
 */
export const GroupScheme = yup.object().shape({
  name: yup.string().required('required').min(3, 'group_min'),
});

/**
 * Создание реквизита
 */
export const RequisiteSchema = yup.object().shape({
  name: yup.string().required('required'),
  BIN: yup.string().required('required').length(12, 'bin_length'),
  BIK: yup.string().required('required').length(9, 'bik_length'),
  account: yup.string().required('required'),
  address: yup.string().required('required'),
});
