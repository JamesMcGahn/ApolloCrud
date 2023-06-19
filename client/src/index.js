import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apollo';
import './index.css';
import App from './App';
import { TixDashTabsProvider } from './context/TixDashTabsContext';
import { TixHistoryProvider } from './context/TixHistoryContext';
import muiTheme from './utils/muiTheme';

// trunk-ignore(eslint/no-undef)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <TixHistoryProvider>
        <TixDashTabsProvider>
          <ThemeProvider theme={muiTheme}>
            <App />
          </ThemeProvider>
        </TixDashTabsProvider>
      </TixHistoryProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
