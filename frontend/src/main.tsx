import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import React from 'react'
import { ApolloClient,ApolloProvider,InMemoryCache } from '@apollo/client'
import { BuildingsProvider } from './contexts/building.context'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
//const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
      <BuildingsProvider>
        <App />
       </BuildingsProvider>
       </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
)
/*createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)*/
