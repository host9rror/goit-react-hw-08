import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar/AppBar'
import PropTypes from 'prop-types';

export const Layout = ({ children }) => {
    return (
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
        <AppBar />
        <Suspense fallback={null}>{children}</Suspense>
      </div>
    );
  };

  Layout.propTypes = {
    children: PropTypes.node.isRequired
  };
  