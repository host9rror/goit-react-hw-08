import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from './Navigation.module.css'

const Navigation = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn); 
    return(
        <div className={css.Navigation}>
            <NavLink to="/">
                Home
            </NavLink>
            {isLoggedIn && (
                <NavLink to="/contacts">
                    Contacts
                </NavLink>
            )}
        </div>
    )
}

export default Navigation;
