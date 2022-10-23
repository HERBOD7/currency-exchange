import React from 'react';
import ContentLoader from 'react-content-loader';

const TableLoader = (props) => (
  <ContentLoader
    speed={2}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="108" y="114" rx="0" ry="0" width="0" height="1" />
    <rect x="285" y="31" rx="0" ry="0" width="1" height="0" />
    <rect x="-1" y="0" rx="0" ry="0" width="400" height="190" />
  </ContentLoader>
);

export default TableLoader;
