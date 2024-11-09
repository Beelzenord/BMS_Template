import React from 'react'
import { useState } from 'react'
//import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './routes/navigation.component';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
// Internal server error: Failed to resolve import "react-router-dom" from "src/App.tsx". Does the file exist?    
import './App.css'
import Buildings from './components/buildings/buildings.component';
import { ApolloClient,InMemoryCache } from '@apollo/client';
/*const Navigation = () => {
 return(<div>Naive</div>)
}
*/

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});


const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>     
    <Router>
     <Routes>
      <Route path='/' element ={<Navigation />}></Route>
      <Route path ='buildings' element={<Buildings />}></Route>
     </Routes>
    </Router>
    </>

  )
}

export default App
/**
 *   <>     
    <Router>
     <Routes>
      <Route path='/' element ={<Navigation />}></Route>
     </Routes>
    </Router>
    </>
 * 
 * <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
 */