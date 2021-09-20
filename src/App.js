import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Homepage from './Homepage/Homepage.js';
import Products from './Productspage/Products.js';
import Buynow from './Buynowpage/Buynow.js'
import Cart from './Cartpage/Cart.js'
import Payment from './Paymentpage/Payment.js'
import Userentrance from './Userentrypage/Userentrance.js'
import {useSelector} from "react-redux"
import {selectUser} from "./Redux/userSlice"
import Userprofile from './Userprofilepage/Userprofile'
import Admin from './Adminpage/Admin';
import Search from './Searchpage/Search.js'

function Errorpage(){
  return(
    <h1>Error Page</h1>
  )
}
function App(props) {
  const user=useSelector(selectUser)

  return (
    <Router>
          {(user!=null)?
           <Switch>
              <Route exact path="/products/:id" component={Products} />
              <Route exact path="/products/search/:id" component={Search} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/checkout-payment" component={Payment} />
              <Route exact path="/buynow/:id" component={Buynow} />
              <Route exact path="/user-profile" component={Userprofile} />
              <Route exact path="/destinyee/admin" component={Admin} />
              <Route exact path='/' component={Homepage} />
              <Route exact path="*" component={Errorpage} /> 
            </Switch>
          :
          <Switch>
            <Route exact path="/products/:id" component={Products} />
            <Route exact path="/products/search/:id" component={Search} />
            <Route exact path="/user-entrance" component={Userentrance} />
            <Route exact path="/buynow/:id" component={Buynow} />
            <Route exact path="/destinyee/admin" component={Admin} />
            <Route exact path='/' component={Homepage} />
            <Route exact path="*" component={Errorpage} /> 
          </Switch>
          }
	  </Router>
  );
}
export default App;