
//import './navigation.styles.scss';
//import './navigation.component.styles.scss';
import './navigation.styles.css'
import { Outlet,Link } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
const Navigation = () => {
    return(
        <Fragment>
         <div className='navigation'>Naive Stugg</div>
         <Link className='logo-container' to='/'>
                <div>Logo</div>
          </Link>
          <Link className='nav-link' to='/buildings'>
                    Buildings
           </Link>

          <div className='nav-links-container'>
               
          </div>
         </Fragment>
    )
}

export default Navigation;