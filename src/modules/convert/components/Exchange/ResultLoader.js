import React from 'react';
import ContentLoader from 'react-content-loader';

const ResultLoader = (props) => (
  <ContentLoader backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
    <rect x="108" y="114" rx="0" ry="0" width="0" height="1" />
    <rect x="285" y="31" rx="0" ry="0" width="1" height="0" />
    <rect x="-2" y="0" rx="0" ry="0" width="400" height="60" />
  </ContentLoader>
);

export default ResultLoader;
