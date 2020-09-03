import React, { useContext } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  Button,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import { useHistory, Link } from 'react-router-dom';
import loginContext from '../context/loginContext';


const Header = () => {
  const { isLoggedIn, toggleLogIn } = useContext(loginContext);

  let history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    toggleLogIn();
    history.push('/login');
  };

  const getRole = () => localStorage.getItem("type");

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand >School Management</NavbarBrand>
        <Nav className="mr-auto" navbar>
          {
            getRole() === "Admin" ?
              <React.Fragment>
                <NavItem>
                  <Link to='/classes'>
                    <NavLink>
                      CLASSES
                </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to='/transactions'>
                    <NavLink>
                      TRANSACTIONS
              </NavLink>
                  </Link>
                </NavItem>
              </React.Fragment> 
              :
              <React.Fragment/>
        }
        </Nav>
        <NavbarText>
          {isLoggedIn ?
            <Button color="white" onClick={handleLogout}>LOGOUT</Button>
            :
            <Link to='/login'>
              <Button color="white">LOGIN</Button>
            </Link>
          }
        </NavbarText>
      </Navbar>
    </div>
  )

};

export default Header;