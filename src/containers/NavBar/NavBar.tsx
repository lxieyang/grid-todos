import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, NavbarText } from 'reactstrap';

import { APP_NAME_FULL } from '../../shared/constants';

import './NavBar.css';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md" fixed="top">
      <NavbarBrand href="/">{APP_NAME_FULL}</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem active>
            <NavLink href="/">Today</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/">Upcoming</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/">History</NavLink>
          </NavItem>
        </Nav>
        <NavbarText>User Name</NavbarText>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
