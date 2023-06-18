import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apollo';
import './index.css';
import App from './App';
import { TixDashTabsProvider } from './context/TixDashTabsContext';
import { TixHistoryProvider } from './context/TixHistoryContext';

// trunk-ignore(eslint/no-undef)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <TixHistoryProvider>
        <TixDashTabsProvider>
          <App />
        </TixDashTabsProvider>
      </TixHistoryProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
