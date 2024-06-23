import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'eact-redux';
import { logIn } from '../../redux/auth/operations';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    )
     .unwrap()
     .then(() => {
        console.log('login success');
      })
     .catch(() => {
        console.log('login error');
      });

    form.reset();
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = (values) => {
    console.log('Form data', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.message}>LogIn now and get full access to our app.</p>
        <label>
          <Field type="email" name="email" className={styles.input} placeholder="" />
          <span>Email</span>
        </label>
        <label>
          <Field type="password" name="password" className={styles.input} placeholder="" />
          <span>Password</span>
        </label>
        <button type="submit" className={styles.submit}>
          Submit
        </button>
        <p className={styles.signin}>
          Dont`t have account? <a href="#">Register now</a>
        </p>
      </Form>
    </Formik>
  );
};

export default LoginForm;