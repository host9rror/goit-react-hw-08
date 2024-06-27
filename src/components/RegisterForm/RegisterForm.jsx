import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './RegisterForm.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { useState } from 'react';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [registerError, setRegisterError] = useState('');

  const handleSubmit = (values, formikBag) => {
    setRegisterError('');
    dispatch(register({
      name: values.username,
      email: values.email,
      password: values.password,
    }))
      .unwrap()
      .then(() => {
        formikBag.resetForm();
      })
      .catch(() => {
        setRegisterError('Registration failed. Please try again.');
        formikBag.setSubmitting(false);
      });
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
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <p className={styles.message}>Sign Up now and get full access to the app.</p>

          <div className={styles.flex}>
            <label>
              <Field type="text" name="username" className={styles.input} placeholder="" />
              <span>Username</span>
              <ErrorMessage name="username" component="div" className={styles.error} />
            </label>
          </div>

          <label>
            <Field type="email" name="email" className={styles.input} placeholder="" />
            <span>Email</span>
            <ErrorMessage name="email" component="div" className={styles.error} />
          </label>

          <label>
            <Field type="password" name="password" className={styles.input} placeholder="" />
            <span>Password</span>
            <ErrorMessage name="password" component="div" className={styles.error} />
          </label>

          <label>
            <Field type="password" name="confirmPassword" className={styles.input} placeholder="" />
            <span>Confirm password</span>
            <ErrorMessage name="confirmPassword" component="div" className={styles.error} />
          </label>

          <button type="submit" className={styles.submit} disabled={isSubmitting}>
            Sign Up
          </button>

          {registerError && <p className={styles.error}>{registerError}</p>}

          <p className={styles.signin}>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
