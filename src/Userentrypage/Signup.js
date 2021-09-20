import React,{useState} from 'react'
import './Signup.css'
import {TextField,Button} from '@material-ui/core';
import axios from './../axios.js'
import Snackbar from '@material-ui/core/Snackbar';

function Signup({myfun}) {
    const [fname,setFname] = useState('')
    const [phno,setPhno] = useState('')
    const [email,setEmail] = useState('')
    const [uname,setUname] = useState('')
    const [pass,setPass] = useState('')
    const [msg,setMsg] = useState('')
    const [address,setAddress] = useState('')
    const [snack,setSnack] = useState(false)
    
    const register = async () => {
        myfun(0)
        const transport = {
            full_name: fname,
            phone_number: phno,
            email: email,
            username: uname,
            password: pass,
            token: window.btoa(uname),
            address: address,
            cart: [],
            orders: []
        }
        await axios.post("/users/register", transport).then((res)=>{
            myfun(1)
            if(res.data.inserted === "true"){
                setMsg("Registration Successfull")
                setSnack(true)
            } else if(res.data.inserted === "exist") {
                setMsg("Username already exists")
                setSnack(true)
            }
        }).catch((err)=>{
            myfun(1)
            setMsg(err)
            setSnack(true)
        })
    }
    return (
        <div className="signup">
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                open={snack}
                autoHideDuration={3000}
                onClose={()=>setSnack(false)}
                message={msg}
            />
            <h1 className="signup__heading">Register</h1>
            <form className="signup__form">
                <TextField onChange={(e)=>setFname(e.target.value)} className="signup__form__fullname" label="Full Name" variant="outlined" size="small" />
                <TextField onChange={(e)=>setPhno(e.target.value)} className="signup__form__phonenum" type="number" label="Phone Number" variant="outlined" size="small" />
                <TextField onChange={(e)=>setEmail(e.target.value)} className="signup__form__email" label="Email" type="email" variant="outlined" size="small" />
                <TextField onChange={(e)=>setUname(e.target.value)} className="signup__form__username" label="Username" variant="outlined" size="small" />
                <TextField onChange={(e)=>setPass(e.target.value)} className="signup__form__password" type="password" label="Password" variant="outlined" size="small" />
                <TextField onChange={(e)=>setAddress(e.target.value)} className="signup__form__address" label="Address" multiline={true} rows={5} variant="outlined" size="small" />
                <Button variant="contained" onClick={register} className="signup__form__btn">Register</Button>
            </form>
        </div>
    )
}

export default Signup
