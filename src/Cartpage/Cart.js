import React,{useEffect,useState} from 'react'
import './Cart.css'
import Navbar from './../Homepage/Navbar.js'
import Picked from './Picked.js'
import Tally from './Tally.js'
import axios from './../axios.js'
import {useSelector,useDispatch} from "react-redux"
import {setQuant,selectQuant,selectUser} from "./../Redux/userSlice"
import {selectCart_details,setCart_details} from "./../Redux/shopSlice"
import ReactLoading from 'react-loading';

function Cart() {
    const dispatch=useDispatch()
    const user=useSelector(selectUser)
    const quant=useSelector(selectQuant)
    const cart_details=useSelector(selectCart_details)
    
    const [cd,setCd] = useState(null)
    const [cartdata,setCartdata] = useState(null)
    const [axdata,setAxdata] = useState(0);
    
    useEffect(() => {
		async function fetchPosts() {
            document.querySelector("body").scrollTo(0,0)
            if(user!=null){
                const response = await axios.get(`/users/data/${user}`).then(res=>{
                if(res.data.cart){
                    setCartdata(res.data.cart)
                    dispatch(setCart_details(res.data.cart))
                    setAxdata(1)
                }
                }).catch(err=>{
                    alert(err)
                })
                return response;
            }
            else 
                return () => {}
            }
		fetchPosts();
	}, [quant]);
    
    const setChangedetect = (e) =>{
        // setCd('a')
        dispatch(setQuant({"some":"some"}))
        // window.location.reload(false);
    }

    return (
        <>
            {(axdata==0)?
                <div className="loading">
                    <div className="loading__inner">
                        <ReactLoading color={"white"} type={"spin"} height={100} width={100} />
                    </div>
                </div>
            :""}
            <>
                <Navbar />
                <div className="cart"> 
                    {(cartdata != null)?(cartdata.length ===0)?
                        <div className="cart__noitems">
                            <h3>Opps! No items in the cart</h3>
                        </div>
                    :
                    <Picked data={cartdata} callback={setChangedetect}/>:""
                    }
                    <Tally />
                </div>
            </>
        </>
    )
}

export default Cart
