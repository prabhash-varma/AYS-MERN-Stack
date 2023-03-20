import {Link, useNavigate} from 'react-router-dom';
import {store} from './App.js'
import React, { useEffect,useContext } from 'react'


function OtpProtectedRoute(props) {
    const {Component} = props;
    const navigate = useNavigate();
    const {otpdetails, setOtpDetails}=useContext(store);
    useEffect(() => {
        
        if(otpdetails.email==="" || otpdetails=={} || otpdetails.email===undefined){
            navigate('/login');
        }
    }, [])



  return <Component/>
}

export default OtpProtectedRoute
