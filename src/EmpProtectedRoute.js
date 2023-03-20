import {Link, useNavigate} from 'react-router-dom';
import {store} from './App.js'
import React, { useEffect,useContext } from 'react'

function EmpProtectedRoute(props) {
    const {Component} = props;
    const navigate = useNavigate();
    const {empdetails,setempDetails} = useContext(store);
    console.log(empdetails,"empdetails")
    useEffect(() => {
        
        if(empdetails.email==="" || empdetails=={} || empdetails.email===undefined || empdetails==null){
            navigate('/login_employee');
        }
    }, [])



  return <Component/>

}

export default EmpProtectedRoute
