import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { useState } from 'react';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setLoginError('');
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        resetForm();
        navigate('/contacts'); 
      })
      .catch(() => {
        setLoginError('Incorrect e-mail address or password');
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <p className={styles.message}>LogIn now and get full access to our app.</p>
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
          <button type="submit" className={styles.submit} disabled={isSubmitting}>
            Submit
          </button>
          {loginError && <p className={styles.error}>{loginError}</p>}
          <p className={styles.signin}>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
