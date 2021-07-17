import axios from 'axios';

import { REGISTER_SUCCESS,REGISTER_FAILED,USER_LOADED,AUTH_ERROR , LOGIN_SUCCESS , LOGIN_FAILED,LOGOUT , CLEAR_PROFILE} from './types';
import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken';

export const loadUser=()=> async dispatch=>{

    if(localStorage.token){

        setAuthToken(localStorage.token);

    }

    try {

        const res=await axios.get('http://localhost:5000/api/auth');
        dispatch({
            type:USER_LOADED,
            payload:res.data
        });
        
    } catch (error) {
        dispatch({
            type:AUTH_ERROR
        })
    }

}

export const register=({name,email,password})=>async dispatch=>{

    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body=JSON.stringify({name,email,password});
    try {

        const res=await axios.post('api/users',body,config);

        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });

        dispatch(loadUser());
        
    } catch (err) {

       
       setAlert('Error in sign up','danger');
        dispatch({
            type:REGISTER_FAILED,
            
        })
        
    }

}

export const login=(email,password)=>async dispatch=>{

    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body=JSON.stringify({email,password});
    try {

        const res=await axios.post('http://localhost:5000/api/auth',body,config);

        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        });
        
    } catch (err) {

       
       setAlert('Error in sign up','danger');
        dispatch({
            type:LOGIN_FAILED,
            
        })
        
    }

}

export const logout=()=>dispatch=>{
    dispatch({
        type:CLEAR_PROFILE
    })
    
    dispatch({
        type:LOGOUT
    })
    
}


