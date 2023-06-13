import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import './App.css';

function App() {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          User: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          Tickets: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  });

  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache,
  });

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="*" element={<>notfound</>} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
