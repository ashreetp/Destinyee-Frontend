import React,{useState} from 'react'
import './Myprofile.css'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Button,TextField} from '@material-ui/core'
import {useSelector,useDispatch} from 'react-redux'
import {selectUser,setUser} from './../Redux/userSlice' 
import axios from './../axios'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

function Myprofile({myfun}) {
    const user = useSelector(selectUser)
    const dispatch = useDispatch();
    const [cp,setCp] = useState(null)
    const [np,setNp] = useState(null)
    const [rnp,setRnp] = useState(null)
    
    const [ph,setPh] = useState(null)
    
    const [em,setEm] = useState(null)
    
    const [add,setAdd] = useState(null)
    
    const [del,setDel] = useState(null)
    
    const hpass = () =>{
        myfun(0)
        if(cp!='' && np!='' && np === rnp){
            const transport = {
                username: user,
                type: "ch_pass",
                cur_pass: cp,
                new_pass: np
            }
            axios.post('/users/change_data',transport).then(res=>{
                alert('Updated Success')
                setCp('')
                setNp('')
                setRnp('')
                myfun(1)
            }).catch(err=>{
                myfun(1)
                alert(err)
            })
        } else {
            if(np=='') {
                myfun(1); 
                alert('Please Type something');
            } 
            else {
                myfun(1); 
                alert("Retype Password Doesn't Match");
            }
            
        }
    }

    const hphno = () =>{
        myfun(0)
        if(ph!=''){
            const transport = {
                username: user,
                type: "ch_phno",
                new_phno: ph
            }
            axios.post('/users/change_data',transport).then(res=>{
                alert('Updated Success')
                setPh('')
                myfun(1)
            }).catch(err=>{
                alert(err)
                myfun(1)
            })
        } else {
            if(ph=='') {
                myfun(1)
                alert('Please Type something'); 
            }else {
                myfun(1)
                alert("Could not update Phone Number")
            }
        }
    }

    const hemail = () =>{
        myfun(0)
        if(em!=''){
            const transport = {
                username: user,
                type: "ch_email",
                new_email: em
            }
            axios.post('/users/change_data',transport).then(res=>{
                alert('Updated Success')
                setEm('')
                myfun(1)
            }).catch(err=>{
                myfun(1)
                alert(err)
            })
        } else {
            if(em=='') {
                myfun(1)
                alert('Please Type something');
            } else {
                myfun(1)
                alert("Could not update Email")
            }
        }
    }

    const hadd = () =>{
        myfun(0)
        if(add!=''){
            const transport = {
                username: user,
                type: "ch_add",
                new_add: add
            }
            axios.post('/users/change_data',transport).then(res=>{
                alert('Updated Success')
                setAdd('')
                myfun(1)
            }).catch(err=>{
                myfun(1)
                alert(err)
            })
        } else {
            if(add=='') {
                myfun(1)
                alert('Please Type something'); 
            }else {
                myfun(1)
                alert("Could not update Email")
            }
        }
    }
    
    const hdel = () =>{
        myfun(0)
        if(del!=''){
            const transport = {
                username: user,
                type: "del",
            }
            axios.post('/users/change_data',transport).then(res=>{
                alert('Deleted Successfully')
                dispatch(setUser({user: false}))
                sessionStorage.removeItem('login')
                window.location.href='/'
                setDel('')
                myfun(1)
            }).catch(err=>{
                myfun(1)
                alert(err)
            })
        } else {
            if(add=='') {
                myfun(1)
                alert('Please Type something'); 
            }else {
                myfun(1)
                alert("Could not Delet Profile")
            }
        }
    }

    const logout = () => {
        dispatch(setUser({user: false}))
        sessionStorage.removeItem('login')
        window.location.href='/'
    }
    
    const classes = useStyles();
    return (
        <div className="myprofile">
            <div className={classes.root}>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>Change Password</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="myprofile__chpwd">
                            <TextField value={cp} type="password" onChange={(e)=>setCp(e.target.value)} className="myprofile__chpwd__tf" size="small"variant="outlined" placeholder="Current Password" />
                            <TextField value={np} type="password" onChange={(e)=>setNp(e.target.value)} className="myprofile__chpwd__tf" size="small"variant="outlined" placeholder="New Password" />
                            <TextField value={rnp} type="password" onChange={(e)=>setRnp(e.target.value)} className="myprofile__chpwd__tf" size="small"variant="outlined" placeholder="Retype New Password" />
                            <Button onClick={hpass} className="myprofile__chpwd__btn" variant="contained">Change</Button>
                        </div>
                    </AccordionDetails>
                    
                </Accordion>

                <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>Change Phone Number</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="myprofile__chphno">
                        <TextField value={ph} onChange={(e)=>setPh(e.target.value)} className="myprofile__chphno__tf" size="small"variant="outlined" placeholder="New Phone Number" />
                        <Button onClick={hphno} className="myprofile__chphno__btn" variant="contained">Change</Button>
                    </div>
                </AccordionDetails>
                </ Accordion>
                
                <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>Change Email</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="myprofile__chem">
                        <TextField value={em} onChange={(e)=>setEm(e.target.value)} className="myprofile__chem__tf" size="small"variant="outlined" placeholder="New Email" />
                        <Button onClick={hemail} className="myprofile__chem__btn" variant="contained">Change</Button>
                    </div>
                </AccordionDetails>
                </ Accordion>

                <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>Change Address</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="myprofile__chadd">
                        <TextField value={add} onChange={(e)=>setAdd(e.target.value)} className="myprofile__chadd__tf" variant="outlined" size="small" multiline={true} rows={7} cols={10} placeholder="New Address" />
                        <Button onClick={hadd} className="myprofile__chadd__btn" variant="contained">Change</Button>
                    </div>
                </AccordionDetails>
                </ Accordion>

                <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>Logout</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="myprofile__del">
                        <Button onClick={logout} className="myprofile__del__btn" variant="contained">Log out</Button>
                    </div>
                </AccordionDetails>
                </ Accordion>

                <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>Delete Account</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="myprofile__del">
                        <Button onClick={hdel} className="myprofile__del__btn" variant="contained">Delete</Button>
                    </div>
                </AccordionDetails>
                </ Accordion>
            </div>
        </div>
    )
}

export default Myprofile
