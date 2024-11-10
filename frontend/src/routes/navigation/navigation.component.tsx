
//import './navigation.styles.scss';
//import './navigation.component.styles.scss';
import './navigation.styles.css'
import { Outlet,Link } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
const Navigation = () => {
    return(
        <header className='Title'>
        <Fragment>
         <div >Naive Stugg</div>
         <Link to='/'>
                <div>Logo</div>
          </Link>
          <Link to='/buildings'>
                    Buildings
           </Link>

          <div >
               
          </div>
         </Fragment>
         </header>
    )
}

export default Navigation;