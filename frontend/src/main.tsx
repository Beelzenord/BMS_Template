import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient,ApolloProvider,InMemoryCache } from '@apollo/client'
//const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <ApolloProvider client={client}>
       <App />
    </ApolloProvider>
  </StrictMode>,
)
/*createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)*/
