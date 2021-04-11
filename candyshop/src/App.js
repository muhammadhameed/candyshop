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


import homeClient from './components/auth/homeClient';
import homeServer from './components/auth/homeServer';

import Menu2 from './components/auth/Menu2';



// import Menu2 from './components/auth/Menu2';
// import homeClient from './components/auth/homeClient';
// import homeServer from './components/auth/homeServer';


import AdminLogin from './components/auth/AdminLogin';
// import shoppingCart from './components/auth/shoppingCart';
import ChangeCustomerUsername from './components/auth/CustomerChangeUsername'
import ResetPassword from './components/auth/ResetPassword';
import AdminRegister from './components/auth/AdminRegister';
import CustomerRegister from './components/auth/CustomerRegister';
import shoppingCart from './components/auth/shoppingCart';
import addProduct from './components/auth/addProduct';
import Error from './components/auth/Error';
import ViewAdmin from './components/auth/ViewAdmin';
import ChangeAdminUsername from './components/auth/ChangeAdminUsername';

// import viewProducts from './components/auth/viewProducts';
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
   
        <Route path="/register" component={ CustomerRegister } /> 
        <Route path="/shoppingCart" component={ shoppingCart } /> 

        <Route path="/home" component={ Home } />
        <Route path="/home-client" component={ homeClient } />
        <Route path="/home-server" component={ homeServer } />

        <Route path="/menu" component={ Menu } />
        <Route path="/menu2" component={ Menu2 } />
        <Route path="/add-product" component={ addProduct } />
        <Route path="/error" component={ Error } />
        <Route path="/change-customer-username" component={ ChangeCustomerUsername } />
        <Route path="/change-admin-username" component={ ChangeAdminUsername } />

        <Route path="/registerAdmin" component={ AdminRegister } />
        <Route exact path="/login-admin" component={ AdminLogin } />
        <Route exact path="/login" component={ CustomerLogin } />
        <Route exact path="/forgot-password" component={ CustomerForgotPassword } />
        <Route exact path="/forgot-password-admin" component={ AdminForgotPassword } />
        <Route exact path="/change-password" component={ CustomerChangePassword } />
        <Route exact path="/change-password-admin" component={ AdminChangePassword } />
        <Route exact path="/view-admins" component={ ViewAdmin } />

        
        <Route exact path="/adduser" component={ AddUser } />
        <Route exact path="/resetpassword" component={ ResetPassword } />
      </div>  
    </Router>   
  );
}

export default App;