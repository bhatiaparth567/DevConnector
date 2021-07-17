import React from 'react';
import {Fragment,useState} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({login,isAuthenticated}) => {

    const [formData, setFormData]=useState({
        
        email:'',
        password:'',
        
    });
    
    const onChange=e=> setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit=async e=>{
        e.preventDefault();
        login(email,password);
    }

    //redirect if logged in
    if(isAuthenticated){
      return <Redirect to="/dashboard" />
    }


    const {email,password}=formData;
    return (
        <Fragment>

<h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)} >
        
        <div className="form-group">
          <input type="email" placeholder="Email Address" 
          onChange={e=>onChange(e)}
          name="email" />
          
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={e=>onChange(e)} 
          />
        </div>
        
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Register</Link>
      </p>
            
        </Fragment>
    )
}

Login.propTypes={
  login:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
}

const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login);
