import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import routes from '../router/routes';

const Router = (props) => {
  const routesList = routes.map((route, index) => {
    return (
      <Route key={index} path={route.path} element={<route.component />} />
    );
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {routesList}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
