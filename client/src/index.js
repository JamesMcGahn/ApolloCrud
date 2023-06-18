import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apollo';
import './index.css';
import App from './App';
import { TixDashTabsProvider } from './context/TixDashTabsContext';

// trunk-ignore(eslint/no-undef)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <TixDashTabsProvider>
        <App />
      </TixDashTabsProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
