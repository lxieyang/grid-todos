import React, { useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, NavbarText } from 'reactstrap';
import moment from 'moment';

import { APP_NAME_FULL } from '../../shared/constants';

import './NavBar.css';

interface Props {
  email: string | null;
}

const NavBar: React.FC<Props> = ({ email }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md" fixed="top">
      <Link className="navbar-brand" to="/">
        {APP_NAME_FULL}
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem active>
            <Link className="nav-link" to="/">
              Today ({moment().format('MMMM Do, YYYY')})
            </Link>
          </NavItem>
          {/* <NavItem>
            <Link className="nav-link" to="/">
              Upcoming
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/">
              History
            </Link>
          </NavItem> */}
        </Nav>
        <Link to="/auth" className="navbar-text">
          {email ? email : 'Sign in'}
        </Link>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
