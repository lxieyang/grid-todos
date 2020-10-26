import React, { useState } from 'react';
import { Badge } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import moment from 'moment';

import { APP_NAME_FULL } from '../../shared/constants';
import appRoutes from '../../shared/appRoutes';
import Logo from '../../assets/img/logo.png';

import './NavBar.css';

interface Props {
  email: string | null | undefined;
}

const NavBar: React.FC<Props> = ({ email }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md" fixed="top">
      <Link className="navbar-brand" to={appRoutes.home}>
        <Badge color="info" pill className="BetaBadge">
          {/* beta */} β
        </Badge>
        <img src={Logo} alt="logo" />
        {APP_NAME_FULL}
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          {email ? (
            <NavItem>
              <Link className="nav-link" to={appRoutes.home}>
                Today ({moment().format('MMMM Do, YYYY')})
              </Link>
            </NavItem>
          ) : null}

          {/* <NavItem>
            <Link className="nav-link" to={appRoutes.home}>
              Upcoming
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to={appRoutes.home}>
              History
            </Link>
          </NavItem> */}
        </Nav>
        {email !== undefined && (
          <Link to={appRoutes.auth} className="navbar-text">
            {email ? email : 'Authenticate'}
          </Link>
        )}
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
