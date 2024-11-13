
import {Route,Routes} from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component'
import './App.css'
import Buildings from './routes/buildings/buildings.component';
import { ApolloClient,InMemoryCache } from '@apollo/client';


const Home = ()=>{
  return(<div>Home</div>)
}

const App = () => {

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/buildings" element={<Buildings />} />
     </Routes>
    </div>
  )
}

export default App
