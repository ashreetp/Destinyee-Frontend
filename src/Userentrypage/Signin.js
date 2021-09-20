import React,{useState} from 'react' 
import './Signin.css'
import {TextField,Button} from '@material-ui/core';
import {Link, useHistory} from "react-router-dom";
import axios from './../axios.js'
import {useSelector,useDispatch} from "react-redux"
import {setUser,selectUser} from "./../Redux/userSlice"
import Snackbar from '@material-ui/core/Snackbar';

function Signin({myfun}) { 
    const [uname,setUname] = useState('')
    const [pass,setPass] = useState('')
    const [msg,setMsg] = useState('')
    const [snack,setSnack] = useState(false)
    let history = useHistory()
    const dispatch=useDispatch()
    const user=useSelector(selectUser)

    const login = async () => {
        myfun(0)
        const transport = {
            username: uname,
            password: pass
        }
        await axios.post("/users/login", transport).then((res)=>{
            if(res.data.found === "true"){
                dispatch(setUser({user: transport.username}))
                sessionStorage.setItem("login", res.data.token);
                window.location.href='/'
            } else {
                myfun(1)
                setMsg("Login Fail")
                setSnack(true)
            }
        }).catch((err)=>{
            myfun(1)
            setMsg(err)
            setSnack(true)
        })
    }
    
    return (
        <div className="signin">
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
            <h1 className="signin__heading">Login</h1>
            <div className="signin__form">
                <TextField onChange={(e)=>setUname(e.target.value)} className="signin__form__username" label="Username" variant="outlined" size="small" />
                <TextField onChange={(e)=>setPass(e.target.value)} className="signin__form__password" type="password" label="Password" variant="outlined" size="small" />
                <Link variant="outlined" className="signin__form__forgotpassword" style={{textDecoration: "none",color: "inherit"}} to='/forgot'>Forgot password</Link>
                <Button onClick={login} variant="contained" className="signin__form__btn">LOG IN</Button>
            </div>
        </div>
    )
}

export default Signin
