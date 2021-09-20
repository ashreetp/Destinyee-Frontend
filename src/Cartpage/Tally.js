import React,{useEffect,useState} from 'react'
import './Tally.css'
import {Button} from '@material-ui/core'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux"
import {selectQuant,selectUser} from "./../Redux/userSlice"
import {selectCart_details} from "./../Redux/shopSlice"
import axios from './../axios.js'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
  return {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Tally() {
    const quant=useSelector(selectQuant)
    const user=useSelector(selectUser)
    const cart_details=useSelector(selectCart_details)
    let sum = 0;
    
    const openPayModal = async() => {
        if(sum==0)
            alert("Please add atleast one item")
        else{
            const res = await axios.post('/payment',{
                amount: sum*100,
                user: user
            })
            console.log(res.data)
            const dat = res.data.order
            const dat_user = res.data
            const options = {
                key: 'rzp_test_fexJOswEsG63La',
                amount: dat.amount,
                currency : "INR",
                name: 'Destinyee',
                order_id: dat.id,
                description: 'some description',
                handler: async function(response) {
                    const res = await axios.post('/payment/verify',{
                        user: user,
                        oid: response.razorpay_order_id,
                        pid: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                    })
                    if(res.data.payment == "Success"){
                        setOpen(true);
                        setTimeout(() => {
                            setOpen(false);
                            window.location.href='/user-profile';
                        }, 5000);
                    } else {
                        alert("Fail")
                    }
                },
                prefill: {
                    name: dat_user.name,
                    contact: dat_user.contact,
                    email: dat_user.email,
                },
                theme: {
                    color: '#E41B57',
                    hide_topbar: false
                }
            };
            let rzp1 = new window.Razorpay(options);
            rzp1.open();
        }
    };
    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
	}, [quant]);

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
        <h2>Hurray!</h2>
        <p>
            Order Successfully Placed Please Check Your Order in My Order section in User-Profile.
        </p>
        </div>
    );

    function fetchPosts() {
        if(cart_details!=null){
            cart_details.map(dat=>{
                if(parseInt(dat.quantity)!=0){
                    sum+=(parseInt(dat.price)*parseInt(dat.quantity))
                } else{
                    sum+=parseInt(dat.price)
                }
            })
        }        
    }

    fetchPosts();

    return (
        <div className="tally">
            <h1>Price Summary</h1>
            <table border="1" className="tally__table">
                <tr>
                    <td>
                        Total MRP(inc. of taxes)
                    </td>
                    <td>
                        {sum}
                    </td>
                </tr>
                <tr>
                    <td>
                        Delivery Fee 
                    </td>
                    <td>
                        Free
                    </td>
                </tr>
                <tr>
                    <td>
                        Bag Discount 
                    </td>
                    <td>
                        -Rs 0
                    </td>
                </tr>
                <tr> 
                    <td>
                        Sub Total 
                    </td>
                    <td>
                        {sum}
                    </td>
                </tr>
            </table>
            <hr className="tally__hr" />
            <div className="tally__ending">
                <h3 style={{marginTop: 10}}>Total : {sum}</h3>
                <Button onClick={openPayModal} className="tally__btn" variant="outlined"><h3 className="tally__btn__name">Proceed to checkout</h3></Button>
            </div>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    {body}
                </Modal>
            </div>
        </div>
    )
}

export default Tally
