import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import './index.css'
import AppWrapper from './AppWrapper'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://spotify-graphql.herokuapp.com/graphql' }),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <HashRouter>
      <AppWrapper />
    </HashRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
