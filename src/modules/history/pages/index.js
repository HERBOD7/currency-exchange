import React from 'react';
import ConversionTable from '../components/ConversionTable';
import './History.scss';

const History = (props) => {
  return (
    <div>
      <h2 className="font-page-title color-default">Conversion history</h2>
      <ConversionTable />
    </div>
  );
};

export default History;
