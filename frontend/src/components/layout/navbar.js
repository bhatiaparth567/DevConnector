import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({auth:{isAuthenticated,loading},logout}) => {
    const AuthLinks=(

      <ul>

      <li>
          <Link to='/profiles'> 
            Developers
          </Link>
      </li>

      <li>
          <Link to='/posts'> 
            Posts
          </Link>
      </li>
        
        
        <li>
          <Link to='/dashboard'>
            <i className="fa fa-user"></i>
            Dashboard</Link>
           </li>
        <li>
        
          <a onClick={logout}>
            
            
          <i className="fas fa-sign-out-alt"></i>
          logout

          </a>
        </li>
      </ul>

    );

    const guestLinks=(

      <ul>
        <li>
        <Link to='/profiles'>
            Developers
        </Link>

        </li>
        
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>

    );

    return (
    <nav className="navbar bg-dark">
      <Link to='/'>
        <i className="fas fa-code"></i> DevConnector
      </Link>

      { !loading && (<Fragment>{isAuthenticated?AuthLinks:guestLinks}</Fragment>)}
      
    </nav>
    );
}

Navbar.propTypes={
  logout:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
}

const mapStateToProps=state=>({

  auth:state.auth

})

export default connect(mapStateToProps,{logout})(Navbar);


