import React,{useEffect,useState} from 'react'
import './Userprofile.css'
import Navbar from './../Homepage/Navbar'
import { Button } from '@material-ui/core';
import Myprofile from './Myprofile'
import Myorders from './Myorders'
import ReactLoading from 'react-loading';
import {useSelector} from 'react-redux';
import {selectUser} from './../Redux/userSlice.js'

function Userprofile() {
    const user = useSelector(selectUser);
    const [aupload, setAupload] = useState(1)
    const [aedit, setAedit] = useState(0)
    const [axdata,setAxdata] = React.useState(1);
    const axSet = (e) => {
        setAxdata(e)
    }
    React.useEffect(()=>{
        function fetch(){
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);
            
        }
        fetch();
    },[])
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
            <div className="userprofile">
                <h1 style={{fontFamily: 'kOhO', letterSpacing: 5,marginLeft: 30,marginTop: 30, color: "grey"}}>{user}</h1>
                <div className="userprofile__selector">
                    <Button className={`userprofile__btn ${(aupload==1)?"userprofile__active":""}`} onClick={()=>{setAupload(1);setAedit(0)}}>Manage Profile</Button>        
                    <Button className={`userprofile__btn ${(aedit==1)?"userprofile__active":""}`} onClick={()=>{setAedit(1);setAupload(0)}}>My orders</Button>
                </div>
                {(aupload == 1)?
                    <Myprofile myfun={axSet} /> 
                :""} 
                {(aedit == 1)?
                    <Myorders myfun={axSet} />
                :""}
            </div>
        </>
    )
}

export default Userprofile
