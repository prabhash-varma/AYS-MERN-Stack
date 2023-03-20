//App
import React, { useContext, createContext, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Register from "./pages/Register";
import Employee_login from "./pages/Employee_login";
import Employee_home from "./pages/Employee_home";
import Login from "./pages/Login";
import Work from "./pages/Work";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
import Salon from "./pages/Salon";
import Appliances from "./pages/Appliances";
import HomeCleaning from "./pages/HomeCleaning";
import PackersAndMovers from "./pages/PackersAndMovers";
import Construction from "./pages/Construction";
import PestControl from "./pages/PestControl";
import Painting from "./pages/Painting";
import Plumbing from "./pages/Plumbing";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import OrderDetails from "./pages/OrderDetails";
import RequestsDetails from "./pages/RequestDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginButton from './accounttype';
import EmpProfile from "./pages/Empprofile";
import CheckOTP from "./pages/CheckOTP";
import ProtectedRoute from "./ProtectedRoute";
import EmpProtectedRoute from "./EmpProtectedRoute";
import OtpProtectedRoute from "./OtpProtectedRoute";

export const store = createContext();





function App() {
  const [cartItems, setCartItems] = useState([]);
  const [orderslist, setOrderslist] = useState([]);
  const [requestslist, setRequestslist] = useState([]);
  const [userdetails, setUserDetails] = useState({ email: "", password: "" });
  // const [empdetails, setempDetails] = useState({ email: "", password: "" });
  const [empdetails, setempDetails] = useState({});
  const [otpdetails, setOtpDetails] = useState({});
  


  


  return (
    <div className="App">
      <store.Provider
        value={{
          otpdetails,
          setOtpDetails,
          cartItems,
          setCartItems,
          userdetails,
          setUserDetails,
          empdetails,
          setempDetails,
          orderslist,
          setOrderslist,
          requestslist,
           setRequestslist
        }}
      >
        <BrowserRouter>
          <Routes>
          
            <Route path="/" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login_employee" element={<Employee_login />} />
            <Route path="/Employee_home" element={<EmpProtectedRoute Component={Employee_home} />} />
            <Route path="/work" element={<EmpProtectedRoute Component={Work} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ays/home" element={<ProtectedRoute Component={Home} />} />
            <Route path="/ays/about" element={<ProtectedRoute Component={About} />} />
            <Route path="/ays/contactus" element={<ProtectedRoute Component={Contactus} />} />
            <Route path="/ays/services/salon" element={<ProtectedRoute Component={Salon} />} />
            <Route
              path="/ays/services/homecleaning"
              element={<ProtectedRoute Component={HomeCleaning} />}
            />
            <Route
              path="/ays/services/packersandmovers"
              element={<ProtectedRoute Component={PackersAndMovers} />}
            />
            <Route path="/ays/services/appliances" element={<ProtectedRoute Component={Appliances} />} />
            <Route path="/ays/services/pestcontrol" element={<ProtectedRoute Component={PestControl} />} />
            <Route path="/ays/services/painting" element={<ProtectedRoute Component={Painting} />} />
            <Route path="/ays/services/plumbing" element={<ProtectedRoute Component={Plumbing} />} />
            <Route
              path="/ays/services/construction"
              element={<ProtectedRoute Component={Construction} />}
            />
            <Route path="/ays/cart" element={<ProtectedRoute Component={Cart} />} />
            <Route path="/ays/profile" element={<ProtectedRoute Component={Profile} />} />
            <Route path="/ays/orders" element={<ProtectedRoute Component={Orders} />} />
            <Route path="/ays/orders/:orderid" element={<ProtectedRoute Component={OrderDetails} />} />
            <Route path="/ays/requests/:requestid" element={<ProtectedRoute Component={RequestsDetails} />} />
            <Route path="/ays/settings" element={<ProtectedRoute Component={Settings} />} />
            <Route path="/mainLogon" element={<LoginButton/>}/>
            <Route path="/empProfile" element={<EmpProtectedRoute Component={EmpProfile} />}/>
            <Route path="/checkOTP" element={<OtpProtectedRoute Component={CheckOTP}/>}/>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </store.Provider>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
