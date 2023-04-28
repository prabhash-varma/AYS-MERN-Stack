import React, { useState, useContext, useEffect } from "react";
import EmpNav from "../components/EmpNav.js";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { store } from "../App.js";
import "./css/OrdersDetails.css";
function RequestDetails() {
  const navigate = useNavigate();
  const { requestslist, empdetails } = useContext(store);
  const [amount, setamount] = useState("");
  // const submithandler = async (e) => {
  //   e.preventDefault();
  //   const res = await Axios.patch(`http://localhost:3001/orders/${temp.id}`, {
  //     cost: amount,
  //     status: 1,
  //   });
  //   const res1 = await Axios.patch(
  //     `http://localhost:3001/employees/${temp.eid}`,
  //     { free: 1 }
  //   );
  //   // navigate("/Employee_home");
  // };
  let { requestid } = useParams();

  useEffect(() => {}, [amount]);

  return (
    <div>
      <EmpNav />
   
      <div style={{marginTop: '10px'}}></div>
       <div className="cart-header" style={{ display: "flex" }}>
        <h1 style={{ "margin-top": "60px", marginLeft: "50px" }}>
          <i
            style={{ marginRight: "20px" }}
            class="fas fa-edit"
            ></i>
          Request Details
                  </h1>
      </div>

      <hr style={{ width: "900px", height: "2px" }}></hr>
     
      <div style={{marginTop:"40px"}}>
      
      {requestslist.length === 0 ? (
        <div style={{display: "flex",flexDirection: "row",justifyContent: "space-evenly"}}>
        <div style={{display: "flex", flexDirection: "column","justify-content":"center",alignItems: "flex-start"}}>   
         <h2> No requests at present</h2>         
       </div>
       </div>
 
 ) : (
   <>
          {" "}
          {requestslist.map((item, key) => {
            if (key == requestid) {
              return (
                   <div style={{display: "flex",flexDirection: "row",justifyContent: "space-evenly"}}>
         <div style={{display: "flex", flexDirection: "column","justify-content":"center",alignItems: "flex-start"}}>
       
                  <h3><u>Requested service:</u></h3>
                  <h5>{item.iname}</h5>
                 
                  <h3 style={{marginTop:"20px"}}><u>Customer details:</u></h3>
                  <h5>Email: {item.ord_email}</h5>
                  <h5>Phone: {item.ord_phone}</h5>                        
                  <h3 style={{marginTop:"20px"}}><u>Address:</u></h3>
                  <h5>{item.ord_address1},</h5>                        
                  <h5>{item.ord_address2},</h5>                                               
                 <h5>{item.ord_state},</h5>
                <h5>{item.ord_pincode}.</h5> 

                <div style={{display:"flex",justifyContent:"space-evenly"}}>
          <div style={{marginRight:"20px"}}>
         </div>
       </div>
 {item.status === 0 ? (
                    // <form onSubmit={submithandler}>
                    <form>
                      <h4>Amount:<input style={{fontSize:"20px" }} type="number" placeholder="cost of the service"
                           onChange={(e) => {setamount(e.target.value);}}/>
                      </h4>
                      <br />
                 <input type="radio" /><h4>
                        Work Completed
                        </h4>
                  
                      <button  class="btn btn-outline-success"type="submit" onClick={async (e) => {e.preventDefault();
                      console.log(item._id);
                      const res = await Axios.post(`https://ays-mern-backend.vercel.app/updateorder`,{orderid :item._id,cost: amount, status: 1},{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}});
                     const res1 = await Axios.post(`https://ays-mern-backend.vercel.app/updateemployeebyemail`,{email:item.eemail,free:1},{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}})
                          .then(() =>{navigate("/Employee_home");});}} >
                        Post
                      </button>
                    </form>
                  ) : (<>
                      <h2 style={{marginTop:"30px"}}>Cost(₹) : {item.cost}</h2>
                      <h5 style={{color:"Darkgreen"}}>Satus: Completed</h5>
                  </>
               
                  )}
                </div>
                   <div className="orders-details" style={{display: 'flex',flexDirection:"center",justifyContent: 'center',alignItems: 'center'}}>
       <img className="orders-details" style={{width:"300px",height:"200px",marginBottom:"10px",display: 'flex',flexDirection:"right",justifyContent: 'right',alignItems: 'right'}} src={item.iimg}/>
            </div> 
                  </div>
              );
            }
          })}{" "}
        </>
      )}</div>
    </div>
  );
}
export default RequestDetails;
