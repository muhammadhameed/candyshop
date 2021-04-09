import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Switch
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddUser from './components/auth/AddUser';
import AdminAppNavbar from './components/subcomponents/AdminAppNavbar';
import CustomerAppNavbar from './components/subcomponents/CustomerAppNavbar';
import CustomerForgotPassword from './components/auth/CustomerForgotPassword';
import AdminForgotPassword from './components/auth/CustomerForgotPassword';
import CustomerChangePassword from './components/auth/CustomerChangePassword';
import AdminChangePassword from './components/auth/AdminChangePassword';
import CustomerLogin from './components/auth/CustomerLogin';

import Home from './components/auth/Home';
import Menu from './components/auth/Menu';

import AdminLogin from './components/auth/AdminLogin';
// import shoppingCart from './components/auth/shoppingCart';

import ResetPassword from './components/auth/ResetPassword';
import AdminRegister from './components/auth/AdminRegister';
import CustomerRegister from './components/auth/CustomerRegister';
import shoppingCart from './components/auth/shoppingCart';
// import ViewTrip from './components/ViewTrip';
// import admindetails from './components/admindetails';
// import edittripobj from './components/edittripobj';
// import toggleAdmin from './components/toggleAdmin';
//will keep user logged in even if refreshes too from a react tutorial
// import Farm from './components/Trip'
// import ViewFinance from './components/viewFinances';
const  App =()=>{
  return (
    <Router>
      <div className="App">
        {/* <Route path="/" component={ CustomerAppNavbar } /> */}
        {/* <Route path="/vt" component={ ViewTrip } />
        <Route path="/vf" component={ ViewFinance } />
        
        <Route path="/eto" component={ edittripobj } />
        <Route path="/f" component={ Farm } />*/}
        <Route path="/register" component={ CustomerRegister } /> 
        <Route path="/shoppingCart" component={ shoppingCart } /> 

        <Route path="/home" component={ Home } />
        <Route path="/menu" component={ Menu } />

        <Route path="/registerAdmin" component={ AdminRegister } />
        <Route exact path="/login-admin" component={ AdminLogin } />
        <Route exact path="/login" component={ CustomerLogin } />
        <Route exact path="/forgot-password" component={ CustomerForgotPassword } />
        <Route exact path="/forgot-password-admin" component={ AdminForgotPassword } />
        <Route exact path="/change-password" component={ CustomerChangePassword } />
        <Route exact path="/change-password-admin" component={ AdminChangePassword } />
        {/*/ <Route exact path="/va" component={ admindetails } />
        // <Route exact path="/toggleAdmin" component={ toggleAdmin } /> */}

        
        <Route exact path="/adduser" component={ AddUser } />
        <Route exact path="/resetpassword" component={ ResetPassword } />
      </div>  
    </Router>   
  );
}

export default App;