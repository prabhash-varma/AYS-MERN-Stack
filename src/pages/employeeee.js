import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import "./css/work.css";
import { store } from "../App";
import { useNavigate, Link } from "react-router-dom";

function Work() {
  const [empdetails] = useContext(store);
  const [orderitems, setOrderItems] = useState("");
  const [amount, setamount] = useState("");
  const navigate = useNavigate();

  const getorderdetails = async () => {
   Axios.get(`https://ays-mern-backend.onrender.com/ordersbyemp?eemail=${empdetails.email}`,{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}}).then((res)=>{
      
      if(res.data.auth==true){
        setOrderItems(res.data.orders[0]);
      }
      else{
        console.log("error in employeeee.js");
      }
   })
   
  };

  const submithandler = async (e) => {
    e.preventDefault();
    const res = await Axios.post(
      `https://ays-mern-backend.onrender.com/updateorder`,{orderid :orderitems._id,cost: amount, status: 1},{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}}

    );
    const res1 = await Axios.post(
      `https://ays-mern-backend.onrender.com/updateemployeebyemail`,{email:orderitems.eemail,free:1},{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}}
    );
    navigate("/Employee_home");
  };
  useEffect(() => {
    if (empdetails.length === 0) {
      navigate("/");
    }
    console.log("imm in");
    getorderdetails();
  }, [empdetails, orderitems.length]);
  return (
    <div>
      {orderitems.length === 0 ? (
        <div>No orders yet</div>
      ) : (
        <div>
          <h1>Orders Requested</h1>
          <p>
            <h3>empdetails:{empdetails.email}</h3>
            <h3>empdetails:{empdetails.password}</h3>
            <h2>Customer details :- </h2>
            <h3>Name: {orderitems.ufname}</h3>
            <h3>email :{orderitems.ord_email}</h3>
            <h3> city:{orderitems.ord_address1}</h3>
            <h3> State:{orderitems.ord_state}</h3>
            <h3> Residential address:{orderitems.ord_address2}</h3>
            <h3>Contact number:{orderitems.ord_phone}</h3>
          </p>
          {orderitems.status === 0 ? (
            <form onSubmit={submithandler}>
              <h4>
                Cost:
                <input
                  type="number"
                  placeholder="enter the amount"
                  onChange={(e) => {
                    setamount(e.target.value);
                  }}
                />
              </h4>
              <br />
              <h3>
                <input type="radio" />
                work Completed
              </h3>
              <button type="submit" class="btn btn-outline-success">
                Post
              </button>
            </form>
          ) : (
            <h4>
              <div>Cost : {orderitems.cost}</div>
              <div>Satus:Completed</div>
            </h4>
          )}
        </div>
      )}
    </div>
  );
}
export default Work;
