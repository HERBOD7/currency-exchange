import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/shared/header';
import './DefaultLayout.scss';

const DefaultLayout = () => {
  return (
    <div className="DefaultLayout">
      <Header />
      <main className="flex justify-center DefaultLayout__wrapper">
        <div className="DefaultLayout__main py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DefaultLayout;
