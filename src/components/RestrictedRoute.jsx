import { Route, Navigate, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import PropTypes from 'prop-types'; 

const RestrictedRoute = ({ component: Component, redirectTo = '/', ...rest }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Routes>
      <Route
        {...rest}
        element={isLoggedIn ? <Component /> : <Navigate to={redirectTo} replace />}
      />
    </Routes>
  );
};

RestrictedRoute.propTypes = {
  component: PropTypes.elementType.isRequired, 
  redirectTo: PropTypes.string, 
};

export default RestrictedRoute;