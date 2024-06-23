import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Navigation = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn); 
    return(
        <div>
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
