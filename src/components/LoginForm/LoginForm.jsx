import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(logIn(values))
      .unwrap()
      .then((response) => {
        resetForm();
        navigate('/contacts'); 
      })
      .catch((error) => {
        alert(`Login failed: ${error.message || error}`);
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
          <p className={styles.signin}>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
