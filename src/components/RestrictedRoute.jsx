import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import PropTypes from 'prop-types'; 

const RestrictedRoute = ({ component: Component, redirectTo = '/', ...rest }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      {!isLoggedIn ? <Component /> : <Navigate to={redirectTo} replace/>  }
    </>
  );
};

RestrictedRoute.propTypes = {
  component: PropTypes.elementType.isRequired, 
  redirectTo: PropTypes.string, 
};

export default RestrictedRoute;