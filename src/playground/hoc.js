// Higher Order Component (HOC) - acomponent that renders another component.

import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = WrappedComponent => {
  return props => (
    <div>
      {props.isAdmin && <p>This is private info. Please don't share!</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const requireAuthentication = WrappedComponent => {
  return props => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>You don't have enough previlage to show this component.</p>
      )}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);
// ReactDOM.render(
//   <AdminInfo isAdmin={true} info="This is the details." />,
//   document.getElementById('app')
// );
ReactDOM.render(
  <AuthInfo isAuthenticated={true} info="This is the details." />,
  document.getElementById('app')
);
