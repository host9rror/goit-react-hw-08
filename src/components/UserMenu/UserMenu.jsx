import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.userNav}>
      <p>Welcome, {user?.name}</p>
      <button type="button" onClick={handleLogout}>LogOut</button>
    </div>
  );
};

export default UserMenu;
