import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { typeDefs, resolvers } from './resolvers';
import App from './App'

import { LINK_RECS_QUERY } from './ApolloQueries'

const httpLink = createHttpLink({uri: process.env.REACT_APP_GRAPHQL_SERVER})

const authLink = setContext( async (_, { headers }) => {
  const token = localStorage.getItem('auth_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const link = authLink.concat(httpLink)
const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
  typeDefs
})

cache.writeData({
  data: {
    linkRecommendations:{
      recTitle: '',
      recLink:'',
      langt:'',
      recommendations:[]
    }
  },
})

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <Route path="/" component={App} />
    </ApolloProvider>
  </Router>
, document.getElementById('root'))
