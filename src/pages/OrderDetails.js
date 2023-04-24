import React,{ useState, useContext} from 'react'
import HomeNav from '../components/HomeNav.js'
import {useParams,useNavigate} from 'react-router-dom'
import {store} from '../App.js'
import icon from './Images/ays.jpg'
import Axios from 'axios'
import './css/OrdersDetails.css'

const  loadScript = (src)=> {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

//const _DEV_ = document.domain === 'localhost'

function OrderDetails() {
  
  const navigate = useNavigate();  
   const {cartItems,setCartItems,userdetails,setUserDetails,orderslist,setOrderslist}  = useContext(store);
   let {orderid} = useParams();
   
  const [name, setName] = useState('siddu')

	const displayRazorpay = async(cost) =>{
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')    
      if (!res) {
          alert('Razorpay SDK failed to load. Are you online?')
           return
         }
      var data 
     await Axios.post(`https://ays-backend.azurewebsites.net/razorpay`, {amount:cost})
      .then((res) => {
        console.log(res.data)
        data = res.data
      })

		const options = {
			key: process.env.REACT_APP_RAZORPAY_KEY_ID,
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id ,
			name: 'AYS',
			description: 'Thank you for Choosing AYS.',
			image: icon,
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
			prefill: {
				name,
				email: 'siddu@gmail.com',
				phone_number: '9014690041'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}


  
  const render = (item) =>{

    if(item.eemail != "")
   return(  
         <div style={{display: "flex",flexDirection: "row",justifyContent: "space-evenly"}}>
         <div style={{display: "flex", flexDirection: "column","justify-content":"center",alignItems: "flex-start"}}>

         <h2 style={{marginTop:"20px"}}><u>Order Details:</u></h2>
        <h6>Ordered Service : {item.iname}</h6>                        
       <h6>Email: {item.ord_email}</h6>
       <h6>Phone: {item.ord_phone}</h6>                        
       <h2 style={{marginTop:"20px"}}><u>Address:</u></h2>
       <h6>{item.ord_address1},</h6>                        
       <h6>{item.ord_address2},</h6>                                               
       <h6>{item.ord_state},</h6>
       <h6>{item.ord_pincode}.</h6>  
       <h2 style={{marginTop:"20px"}}><u>Technician Details:</u></h2>
       <h6>Technician name : {item.efname} {item.elname}</h6>
       <h6>Technician phone number : {item.ephone}</h6>
       <h6 style={{marginBottom:"50px"}}>Technician email : {item.eemail}</h6>
       {item.cost!=0?
       (<div>
         <h2 style={{marginBottom:"20px"}}>Cost(₹):{item.cost}</h2>
       <button className='btn' style={{backgroundColor:'#6666FF',color:'white',width:'140px'}} onClick={()=> {displayRazorpay(item.cost)}}>Pay Online</button>
       </div>)  
       :<h3>Your Request is Still in progress</h3>}
       
       <div style={{display:"flex",justifyContent:"space-evenly"}}>
         <div style={{marginRight:"20px",marginTop:"50px"}}>
          <button className ='btn' style={{backgroundColor:'#ffB52E',color:'white',marginTop:"20px"}} onClick={()=>{ navigate('/ays/contactus')}} >Need Help?</button>
         </div>
       </div>
       </div>
       <div className="orders-details" style={{display: 'flex',flexDirection:"column",justifyContent: 'center',alignItems: 'center'}}>
       <img style={{width:"300px",height:"200px",marginBottom:"10px"}} src={item.iimg}/>
       
       

    </div>
   </div>
 )
 else
 return(
       <div style={{display: "flex",flexDirection: "row",justifyContent: "space-evenly"}}>
        <div style={{display: "flex", flexDirection: "column","justify-content":"center",alignItems: "flex-start"}}>
         <h4>Ordered Service : {item.iname}</h4>                        
         <h4>Email: {item.ord_email}</h4>
         <h4>Phone: {item.ord_phone}</h4>     
         <div style={{marginTop:"60px",border:"2px solid red",borderRadius:"15px",width:"700px",height:"200px"}}>
         <h3 style={{marginTop:"20px"}} ><i style={{color:"red",marginRight:"10px"}} class="fa fa-exclamation-triangle" aria-hidden="true"></i>
 We are sorry for the inconvinience</h3>
         <h3>Currently, there are no technicians available for the requested service </h3>
         <h3>Please try after some time</h3> 
         </div>          
         <div style={{display:"flex",justifyContent:"space-evenly"}}>
       </div>
       </div>
       <div className="orders-details" style={{display: 'flex',flexDirection:"column",justifyContent: 'center',alignItems: 'center'}}>
       <img style={{width:"300px",height:"200px",marginBottom:"10px",border:"2px solid black"}} src={item.iimg}/>       
    </div>
   </div>
)
  }



  return (
    <div>
       <HomeNav/>
       <div style={{marginTop: '80px'}}></div>
       <div className="cart-header" style={{ display: "flex" }}>
        <h1 style={{ "margin-top": "60px", marginLeft: "50px" }}>
          <i
            style={{ marginRight: "20px" }}
            class="fas fa-edit"
          ></i>
          Orders Details 
        </h1>
      </div>

      <hr style={{ width: "900px", height: "2px" }}></hr>
      <div style={{marginTop:"40px"}}>
          {orderslist.map((item,key)=>{
           return(
                   <div className='orderdetails'>
                    { (key==orderid )&& render(item)  }           
                   </div>
                )
            
              })}
      </div>
    </div>
  )
}

export default OrderDetails