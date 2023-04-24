import React, { useRef,useContext,useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import {store}from "../App.js" 
import MainNav from "../components/MainNav";
import { Link, useNavigate } from "react-router-dom";
import "./css/Signup.css";
import Axios from "axios";
import {toast} from "react-toastify"

function CheckOtp_emp() {
    const navigate = useNavigate();
    const {otpdetails_emp,setOtpDetails_emp}=useContext(store);

    const [otp,setOtp]=useState(0);
    
    console.log("OTP details:",otpdetails_emp);

    const form = useRef();

    const [sentotp,setSentotp] = useState("");

useEffect(() => {
    setSentotp(Math.floor(Math.random() * 1000000));
}, [])

useEffect(() => {
   
    if(sentotp!="" && otpdetails_emp.email!=undefined){
        // console.log(" Your OTP",sentotp);
    console.log(form.current)
    emailjs.sendForm(process.env.REACT_APP_EMP_EMAILJS_SERVICE, process.env.REACT_APP_EMP_EMAILJS_TEMPLATE, form.current, process.env.REACT_APP_EMP_EMAILJS_USERID)
      .then((result) => {                                                  
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    }
}, [sentotp])

    
//   };



  const submitHandler = (e)=>{
    e.preventDefault();
    if(otp==sentotp){

        const {firstName,lastName,gender,profession,email,phone,address,city,state,pincode,password}=otpdetails_emp;
        alert("OTP verified");        
        Axios.post(`https://ays-backend.azurewebsites.net/empsignup`, {firstName,lastName,gender,profession,email,phone,address,city,state,pincode,password,free:"1"})
          .then((res) => 
           {
             console.log(res.data);
            if(res.data!=null)
            {
              alert("We received your details. We will contact you soon!");
              navigate("/");
            }
            // else{
            //   alert("Something went wrong! or Email already exists!");
            // }
            else {
              toast.error("Email already exists! Or Something went Wrong",{position: toast.POSITION.BOTTOM_RIGHT})
            }             
          });
    }
    else
    {
        alert("OTP not verified");
    }
}

  return (
    <div>

    <form style={{display:"none"}} ref={form}>
      <label>Name</label>
      <input type="text" name="name" value={otpdetails_emp.firstName} />
      <label>Email</label>
      <input type="email" name="email" value={otpdetails_emp.email} />
      <label>Message</label>
      <textarea name="otp" value={sentotp} />
      
    </form>


    <MainNav />
    <img style={{ height: "650px" }} src="./indeximage.jpg" />
   
     
      <form className="form_s"  onSubmit={submitHandler}>
        <h3 style={{marginBottom:"20px"}}>Enter OTP</h3>
        <div style={{marginBottom:"50px"}}className="flex-container">
          <div >
        {/* <p className="name">First Name</p> */}
            <input
              className="input_s"
              required="required"
              type="text"
              name="firstName"
              aria-describedby="emailHelp"
              placeholder="******"
              onChange={(e) => {
                setOtp(e.target.value);   
              }}
            />
            <p style={{ color: "red" }}>{}</p>
          </div>
        </div>

        

        <button type="submit" style={{width:"100px",height:"30px",color:'black',fontWeight:"20px"}}>
          Submit
        </button>
      </form>
      
    </div>
  )
}

export default CheckOtp_emp
