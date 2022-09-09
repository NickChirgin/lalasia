import React from 'react';
import bag from '@img/bag.svg';
import menu from '@img/menu.svg';
import user from '@img/user.svg';
import V1 from '@img/V1.svg';
import V2 from '@img/V2.svg';
import V3 from '@img/V3.svg';
import { Link } from 'react-router-dom';

import headerStyles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={headerStyles.header}>
      <header>
        <div className={headerStyles.header__logo}>
          <div className={headerStyles.header__logo_image}>
            <img src={V1} alt="v1" />
            <img src={V2} alt="v2" />
            <img src={V3} alt="v3" />
          </div>
          <Link to={`/`} className={headerStyles.header__logo_link}>
            <h2 className={headerStyles.header__logo_company}>Lalasia</h2>
          </Link>
        </div>
        <div className={headerStyles.header__nav_mobile}>
          <img src={menu} alt="" />
        </div>
        <nav className={headerStyles.header__nav}>
          <Link to={`/`} className={headerStyles.header__nav_current}>
            Product
          </Link>
          <p>Services</p>
          <p>Article</p>
          <p>About us</p>
        </nav>
        <div className={headerStyles.header__settings}>
          <img src={bag} alt="bag" />
          <img src={user} alt="user" />
        </div>
      </header>
    </div>
  );
};

export default Header;
