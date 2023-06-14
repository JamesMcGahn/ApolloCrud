import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Container from 'react-bootstrap/Container';
import Dashboard from './pages/Dashboard';
import TicketTable from './components/TicketTable';
import Ticket from './pages/Ticket';

import './App.css';

function App() {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          tickets: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  });

  const client = new ApolloClient({
    uri: process.env.REACT_APP_BE_DOMAIN,
    cache,
    credentials: 'include',
  });

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Container fluid>
            <Routes>
              <Route
                path="/agent/dashboard"
                element={
                  <Dashboard>
                    <TicketTable />
                  </Dashboard>
                }
              />

              <Route
                path="/agent/dashboard/ticket/:id"
                element={
                  <Dashboard>
                    <Ticket />
                  </Dashboard>
                }
              />
              <Route path="*" element={<>notfound</>} />
            </Routes>
          </Container>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
