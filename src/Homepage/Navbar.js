import React,{useRef,useState,useEffect} from 'react'
import './Navbar.css'
import {Link, useHistory} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import FaceIcon from '@material-ui/icons/Face';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'; 
import {useSelector,useDispatch} from "react-redux"
import {setUser,selectCart,selectUser,selectQuant} from "./../Redux/userSlice"
import {setRefresh_products} from "./../Redux/shopSlice"
import axios from './../axios.js'

function Navbar() {
    const user=useSelector(selectUser)
    const cart=useSelector(selectCart)
    const quant=useSelector(selectQuant)

    const [mycart,setMycart] = useState([])
    const [search,setSearch] = useState('')
    const dispatch=useDispatch()
    let history = useHistory()

    useEffect(() => {
      async function fetchPosts() {
        if(user!=null){
          const response = await axios.get(`/users/data/${user}`).then(res=>{
            if(res.data.cart){
              setMycart(res.data.cart)
            }
          }).catch(err=>{
            console.log(err)
          })
          return response;
        }
        else 
          return () => {}
      }
      fetchPosts();
    }, [cart,quant]);

    const wref=useRef(null);
    const nref=useRef(null);
    const i0ref=useRef(null);
    const i1ref=useRef(null);
    const i2ref=useRef(null);
    const i3ref=useRef(null);

    const showsearch = () => {
      wref.current.style.cssText = 'display:inline !important';
      i0ref.current.style.cssText = 'display:none !important'
      i1ref.current.style.cssText = 'display:none !important'
      i2ref.current.style.cssText = 'display:none !important'
      i3ref.current.style.cssText = 'display:inline !important'
      nref.current.style.cssText = 'display:none !important'
    }
  
    const closesearch =() => {
      wref.current.style.cssText = 'display:none !important';
      i0ref.current.style.cssText = 'display:inline !important'
      i1ref.current.style.cssText = 'display:inline !important'
      i1ref.current.style.cssText = 'margin-top: 4px !important'
      i2ref.current.style.cssText = 'display:flex !important'
      i3ref.current.style.cssText = 'display:none !important'
      nref.current.style.cssText = 'display:inline !important'
    }
    const gotoProfiles = () => {
      history.push('/user-profile')
    }
    const logout = () => {
      dispatch(setUser({user: false}))
      sessionStorage.removeItem('login')
      window.location.href='/'
    }
    const handleSearch = () =>{
      history.push(`/products/search/${search}`)
      dispatch(setRefresh_products({search: search}))
    }
    const handleKeypress = e => {
      if (e.charCode === 13) {
        handleSearch()
      }
    };
    return (
        <div className="Nav__root">
        <AppBar className="Nav__app" position="static" color='secondary'>
            <Toolbar className="Nav__toolbar">
              <Typography ref={nref} variant="h5" className="Nav__title">
              <Link style={{textDecoration: "none",color: "inherit"}} to='/'>Destinyee</Link>
              </Typography>
              <div ref={wref} className="wrapper">
                <div className="container">
                  <div className="search-form form">
                    <label>
                        <input onKeyPress={handleKeypress} onChange={(e)=>setSearch(e.target.value)}type="search" className="search-field" placeholder="Type something..." />
                    </label>
                    <button onClick={handleSearch} className="search-submit button"><SearchIcon /> </button>
                </div>
                </div>
              </div>
              <Link style={{textDecoration: "none",color: "inherit"}}><Button ref={i0ref} className="Nav__togglebtn" color="inherit"><SearchIcon onClick={showsearch} style={{ display: "table-cell",marginLeft: 70 }} fontSize="large" /></Button></Link>
              <div ref={i1ref} className="Nav__face" color="inherit">
                {(user != null)?
                   <div class="dropdown">
                      <Button><AccountCircleIcon onClick={gotoProfiles} className="dropbtn" fontSize="large" /></Button>
                      <div class="dropdown-content">
                        <a style={{borderBhottom: "1px solid rgba(0, 0, 0, 0.582)"}} onClick={logout}>Logout</a>
                      </div>
                   </div>:
                  <Link style={{textDecoration: "none",color: "inherit"}} to='/user-entrance'>
                    <Button className="Nav__faceicon" ><FaceIcon fontSize="large" /></Button>
                  </Link>
                }
              </div>
              <Link style={{textDecoration: "none",color: "inherit"}} to='/cart'><Button type="button" ref={i2ref} className="Nav__cart" color="inherit" ><ShoppingCartIcon fontSize="large" />{(mycart.length!=0)?<div className="Nav__cart__number">{mycart.length}</div>:""}</Button></Link>
              <Button ref={i3ref} onClick={closesearch} className="Nav__close" color="inherit"><CloseIcon fontSize="large" /></Button>
            </Toolbar>
        </AppBar>
        </div>
    )
}

export default Navbar
