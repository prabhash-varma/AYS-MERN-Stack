import {Link, useNavigate} from 'react-router-dom';
import {store} from './App.js'
import React, { useEffect,useContext } from 'react'

function OtpProtectedRoute_emp(props) {
    const {Component} = props;
    const navigate = useNavigate();
    const {otpdetails_emp, setOtpDetails_emp}=useContext(store);
    useEffect(() => {
        
        if(otpdetails_emp.email==="" || otpdetails_emp=={} || otpdetails_emp.email===undefined){
            navigate('/login');
        }
    }, [])
  return <Component/>
}
export default OtpProtectedRoute_emp
