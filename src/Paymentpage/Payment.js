import React,{useState} from 'react'
import './Payment.css'
import Navbar from './../Homepage/Navbar.js'
import {Button} from '@material-ui/core'
import Debitcreditcard from './Debitcreditcard.js'
import Upi from './Upi.js'
import Cashondelivery from './Cashondelivery.js'


function Payment() {
    const [act,setAct]=useState(1);
    const [deb,setDeb]=useState(true);
    const [upi,setUpi]=useState(false);
    const [cod,setCod]=useState(false);

    const handleDeb=()=>{
        setDeb(true)
        setUpi(false)
        setCod(false)
    }
    
    const handleUpi=()=>{
        setDeb(false)
        setUpi(true)
        setCod(false)
    }
    
    const handleCod=()=>{
        setDeb(false)
        setUpi(false)
        setCod(true)
    }

    return (
        <>
            <Navbar />
            <div className="payment">
                <div className="payment__top">
                    <h1>Payment</h1>
                    <h1>Pay Rs.399</h1>
                </div>
                <div className="payment__bottom">
                    <div className="payment__bottom__left ">
                        <Button variant="outlined" onClick={handleDeb} className={`payment__bottom__left__btn1 ${(deb)? "payment__bottom__left__btn__active":"" }`} ><h2>DEBIT/CREDIT CARD</h2></Button>
                        <Button variant="outlined" onClick={handleUpi} className={`payment__bottom__left__btn2 ${(upi)? "payment__bottom__left__btn__active":"" }`}><h2>UPI</h2></Button>
                        <Button variant="outlined" onClick={handleCod} className={`payment__bottom__left__btn3 ${(cod) ? "payment__bottom__left__btn__active":""}`}><h2>CASH ON DELIVERY</h2></Button>
                    </div>
                    <div className="payment__bottom__right">
                        {(deb)?<Debitcreditcard />:(upi)?<Upi />:(cod)?<Cashondelivery />:<div />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment
