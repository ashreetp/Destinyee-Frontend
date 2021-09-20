import React,{useEffect,useState} from 'react'
import './Admin.css'
import axios from './../axios.js'
import {TextField,Button} from '@material-ui/core';
import {useDispatch,useSelector} from 'react-redux'
import {selectAdmin, setAdmin_name} from './../Redux/adminSlice'
import Navbar from './../Homepage/Navbar'
import Admincontrol from './Admincontrol'
import ReactLoading from 'react-loading';

function Admin() {
    const dispatch = useDispatch(selectAdmin)
    const admin_name =  useSelector(selectAdmin)
    const [axdata,setAxdata] = useState(1);
    const fref = React.createRef()
    const [uname,setUname] = React.useState('')
    const [pass,setPass] = React.useState('')

    useEffect(() => {
		function fetchPosts() {
            document.querySelector("body").scrollTo(0,0)
        }
		fetchPosts();
	}, [admin_name]);

    const axSet = (e) => {
        setAxdata(e)
    }

    // const handleClick = async () =>
    // {
    //     setAxdata(0)
    //     let data = new FormData();
    //     data.append("image", fref.current.files[0]);
    //     await axios.post('/send-img',data).then(res=>{
    //         setAxdata(1)
    //     }).catch(err=>{
    //         setAxdata(1)
    //         alert(err)
    //     })
    // }
    const login = async () =>{
        setAxdata(0)
        const transport = {
            username: uname,
            password: pass
        }
        await axios.post("/admin/login", transport).then((res)=>{
            if(res.data.admin_login === "true"){
                dispatch(setAdmin_name({admin_name: transport.username}))
                sessionStorage.setItem("admin", transport.username);
                window.location.href='/destinyee/admin'
                setAxdata(1)
            } else {
                alert("Login UnSuccessfull")
                setAxdata(1)
            }
        }).catch((err)=>{
            alert(err)
            setAxdata(1)
        })
    }
    return (
        <>
            {(axdata==0)?
                <div className="loading">
                    <div className="loading__inner">
                        <ReactLoading color={"#f5426c"} type={"bars"} height={100} width={100} />
                    </div>
                </div>
            :""}
            <Navbar />
            <div className="admin">
                {(admin_name == null)?
                    <div className="admin__signin__form">
                            <TextField onChange={(e)=>setUname(e.target.value)} className="admin__signin__form__username" label="Username" variant="outlined" size="small" />
                            <TextField onChange={(e)=>setPass(e.target.value)} className="admin__signin__form__password" type="password" label="Password" variant="outlined" size="small" />
                            <Button onClick={login} variant="contained" className="admin__signin__form__btn">LOG IN</Button>
                    </div>
                :<Admincontrol myfun={axSet} />}
            </div>
        </>
    )
}

export default Admin
