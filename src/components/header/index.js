import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

const Header = (props) => {
  const navItems = [
    {
      title: 'CURRENCY CONVERTER',
      link: '/',
    },
    {
      title: 'VIEW CONVERSION HISTORY',
      link: '/history',
    },
  ];

  const navList = navItems.map((nav, index) => {
    return (
      <NavLink
        to={nav.link}
        className={({ isActive }) =>
          [
            'font-body-text py-5 px-3',
            isActive ? 'Header__active-link color-default' : 'color-header',
          ].join(' ')
        }
        key={index}
        end
      >
        {nav.title}
      </NavLink>
    );
  });

  return (
    <nav className="flex justify-center Header__wrapper">
      <div className="flex items-center Header">
        <Link to="/" className="font-section-title color-default mr-5">
          Currency<span className="fw-700">Exchange</span>
        </Link>
        {navList}
      </div>
    </nav>
  );
};

export default Header;
