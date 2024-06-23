import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './RegisterForm.module.css';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';

const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, formikBag) => {
    dispatch(register({
      name: values.username,
      email: values.email,
      password: values.password,
    }));

    formikBag.resetForm();
  };

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <p className={styles.message}>Register now and get full access to app.</p>

        <div className={styles.flex}>
          <label>
            <Field type="text" name="username" className={styles.input} placeholder="" />
            <span>Username</span>
          </label>
        </div>

        <label>
          <Field type="email" name="email" className={styles.input} placeholder="" />
          <span>Email</span>
        </label>

        <label>
          <Field type="password" name="password" className={styles.input} placeholder="" />
          <span>Password</span>
        </label>

        <label>
          <Field type="password" name="confirmPassword" className={styles.input} placeholder="" />
          <span>Confirm password</span>
        </label>

        <button type="submit" className={styles.submit}>Submit</button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
