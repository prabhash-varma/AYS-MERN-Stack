import {Link, useNavigate} from 'react-router-dom';
import {store} from './App.js'
import React, { useEffect,useContext } from 'react'

function ProtectedRoute(props) {
    const {Component} = props;
    const navigate = useNavigate();
    const {userdetails,setUserDetails,orderslist,setOrderslist}=useContext(store);
    useEffect(() => {
        
        if(userdetails.email===""){
            navigate('/login');
        }
    }, [])



  return <Component/>

  
}

export default ProtectedRoute
