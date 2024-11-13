
import './navigation.styles.css'
import { Link } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
const Navigation = () => {
    return(
        <header className='Title'>
        <Fragment>
         <div >BMS App</div>
         <Link to='/'>
                <div>Logo</div>
          </Link>
          <Link to='/buildings'>
                    Buildings
           </Link>
          <div>    
          </div>
         </Fragment>
         </header>
    )
}

export default Navigation;