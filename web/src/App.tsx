import React from 'react';

import { ApolloProvider, ApolloClient, ApolloLink, InMemoryCache } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { onError as apolloLinkError } from 'apollo-link-error';

import Home from './pages/Home';

import {
  BrowserRouter as Router,
} from 'react-router-dom';
import {
  Switch,
  Route,
} from 'react-router';
import Nav from './components/Nav';
import About from './pages/About';
import EventPage from './pages/EventPage';

export default () => {
  // Setup Apollo client.
  const errorLink = apolloLinkError(err => {
    console.log(err);
  }) as unknown as ApolloLink;
  const httpLink = createHttpLink({
    uri: '/graphql',
  }) as unknown as ApolloLink;
  const client = new ApolloClient({
    link: ApolloLink.from([
      httpLink,
      errorLink,
    ]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  });

  return <>
    <ApolloProvider client={client}>
      <Router>
        <Nav />
        <Switch>
          <Route path="/events/:eventTitle" component={EventPage} />
          <Route path="/about" component={About} />
          <Route component={Home} />
        </Switch>
      </Router>
    </ApolloProvider>
  </>
}