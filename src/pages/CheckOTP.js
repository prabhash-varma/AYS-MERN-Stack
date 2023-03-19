import React, { useRef,useContext,useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import {store}from "../App.js" 
import MainNav from "../components/MainNav";
import { Link, useNavigate } from "react-router-dom";
import "./css/Signup.css";
import Axios from "axios";
import {toast} from "react-toastify"

function CheckOTP() {
    const navigate = useNavigate();
    const {otpdetails,setOtpDetails}=useContext(store);

    const [otp,setOtp]=useState(0);
    
    console.log("OTP details:",otpdetails);

    const form = useRef();

    // const sendEmail = (e) => {
    // e.preventDefault();
    const [sentotp,setSentotp] = useState("");

useEffect(() => {
    setSentotp(Math.floor(Math.random() * 1000000));
}, [])


useEffect(() => {

   
    if(sentotp!="" && otpdetails.email!=undefined){
        // console.log(" Your OTP",sentotp);
    console.log(form.current)
    emailjs.sendForm('service_3z7ta63', 'template_hc5zq3m', form.current, 'lERXfXjcjF38QjHJ3')
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
        // alert("OTP verified");
        Axios.get(`http://localhost:3001/checkemail?email=${otpdetails.email}`).then((res) => {
        if (res.data.length === 0) {
            const { firstName, lastName, email, phone, address, city, state, pincode, password } = otpdetails;

          Axios.post(`http://localhost:3001/signup`, {
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            state,
            pincode,
            password,
          }).then((res) => {
            console.log(res);
            if (res.data) {
              alert("Registration successful!");
              navigate("/login");
            } else {
              alert("Something went wrong");
            }
          });
        } else {
          //setEmailMsg("Email already exists!");
          toast.error("Email already exists!",{position: toast.POSITION.BOTTOM_RIGHT})
        }
      });


        
    }
    else{
        alert("OTP not verified");
    }
  }


  return (
    <div>

    <form style={{display:"none"}} ref={form}>
      <label>Name</label>
      <input type="text" name="user_name" value={otpdetails.firstName} />
      <label>Email</label>
      <input type="email" name="user_email" value={otpdetails.email} />
      <label>Message</label>
      <textarea name="message" value={sentotp} />
      
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

export default CheckOTP
