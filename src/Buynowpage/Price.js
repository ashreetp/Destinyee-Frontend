import React,{useRef,useEffect,useState} from 'react'
import './Price.css'
import {TextField, Button} from '@material-ui/core';
import axios from './../axios.js'
import {useSelector,useDispatch} from "react-redux"
import {setCart,selectUser,selectCart,setQuant,remQuant} from "./../Redux/userSlice"
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 140,
        paddingLeft: 20,
        marginTop: -10,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function Price(data) {
    const classes = useStyles(); 

    const dispatch=useDispatch()
    const user=useSelector(selectUser)
    const cart=useSelector(selectCart)

    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [fitquantity, setFitquantity] = useState(0);
    const [sactive,setSactive] = useState("");
    const [mydetails,setMydetails] = useState(null);

    const s=useRef();const m=useRef();const l=useRef();const xl=useRef();const xxl=useRef();const bagref=useRef()

    const quant_control = async (e) =>{
        (e.target.value===0)?setQuantity(1):setQuantity(e.target.value)
    }

    useEffect(() => {
		async function fetchPosts() {
      if(user!=null){
        const response = await axios.get(`/users/data/${user}`).then(res=>{
          if(res.data.cart){
            setMydetails(res.data.cart)
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
	}, [cart]);

    const addtobag = async() => {
        if(!user) {
            setMsg("Please Login to add to bag")
            setSnack(true);
        }
        else{
            const key = data.data.prod_id + sactive
            if(sactive==""){
                setMsg("Please Select Size")
                setSnack(true);
            } else{
                const transport	 = {
                    username: user,
                    cart: {
                        name: data.data.name,
                        price: data.data.price,
                        quantity: (quantity==0)?1:quantity,
                        size: sactive,
                        imgurl: data.data.img,
                        quant_available: data.data.size,
                        prod_id: key
                    }
                }
                let flag=0;
                mydetails.map((dat)=>{
                    if(dat.name == data.data.name && dat.size == sactive){
                        flag=1;
                    }
                })
                if(flag==0){
                    await axios.post("/users/update-cart",transport).then(res=>{
                        dispatch(setCart({cart: res.data.cart}))
                    }).catch(err=>{
                        setMsg(err)
                        setSnack(true);
                    })
                } else {
                    setMsg("You already have this item in your cart'")
                    setSnack(true);
                }
            }
        }
    }

    useEffect(() => {
        const ret = () => {
            if(data.data != null) {
                Object.entries(data.data.size).map(item => {
                    if(item[0]==="S")   s.current.style.cssText = "display: block !important";  else if(item[0]==="M")   m.current.style.cssText = "display: block !important";  else if(item[0]==="L")   l.current.style.cssText = "display: block !important";  else if(item[0]==="XL")   xl.current.style.cssText = "display: block !important";  else if(item[0]==="XXL")   xxl.current.style.cssText = "display: block !important";  
                  })  
            }
        }  
        return ret;
    }, [data])

    const handleChangeS = () => {
        setFitquantity((data.data != null)?`${data.data.size["S"]}`:"");setSactive('S');s.current.style.backgroundColor="#f54272"; m.current.style.backgroundColor="transparent"; l.current.style.backgroundColor="transparent"; xl.current.style.backgroundColor="transparent"; xxl.current.style.backgroundColor="transparent";
    }
    const handleChangeM = () => {
        setFitquantity((data.data != null)?`${data.data.size["M"]}`:"");setSactive('M');s.current.style.backgroundColor="transparent";m.current.style.backgroundColor="#f54272";l.current.style.backgroundColor="transparent";xl.current.style.backgroundColor="transparent";xxl.current.style.backgroundColor="transparent";
    }
    const handleChangeL = () => {
        setFitquantity((data.data != null)?`${data.data.size["L"]}`:"");setSactive('L');s.current.style.backgroundColor="transparent";m.current.style.backgroundColor="transparent";l.current.style.backgroundColor="#f54272";xl.current.style.backgroundColor="transparent";xxl.current.style.backgroundColor="transparent";
    }
    const handleChangeXL = () => {
        setFitquantity((data.data != null)?`${data.data.size["XL"]}`:"");setSactive('XL');s.current.style.backgroundColor="transparent";m.current.style.backgroundColor="transparent";l.current.style.backgroundColor="transparent";xl.current.style.backgroundColor="#f54272";xxl.current.style.backgroundColor="transparent";
    }
    const handleChangeXXL = () => {
        setFitquantity((data.data != null)?`${data.data.size["XXL"]}`:"");setSactive('XXL');s.current.style.backgroundColor="transparent"; m.current.style.backgroundColor="transparent";l.current.style.backgroundColor="transparent";xl.current.style.backgroundColor="transparent";xxl.current.style.backgroundColor="#f54272";
    }
    return (
        <div className="price">
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                open={snack}
                autoHideDuration={3000}
                onClose={()=>setSnack(false)}
                message={msg}
            />
            <h2>{(data.data != null)?data.data.name:""}</h2>
            <h1>{(data.data != null)?`Rs.${data.data.price}`:""}</h1>
            <h4 style={{marginTop: 10}}>Select Size</h4>
            <div className="price__size">
                <Button ref={s} variant="outlined" className="price__size__btn" onClick={handleChangeS} style={{marginRight: 20, padding: 10}} ><h3 className="price__size__btn__text">S</h3></Button>
                <Button ref={m} variant="outlined" className="price__size__btn" onClick={handleChangeM} style={{marginRight: 20, padding: 10}} ><h3 className="price__size__btn__text">M</h3></Button>
                <Button ref={l} variant="outlined" className="price__size__btn" onClick={handleChangeL} style={{marginRight: 20, padding: 10}} ><h3 className="price__size__btn__text">L</h3></Button>
                <Button ref={xl} variant="outlined" className="price__size__btn" onClick={handleChangeXL} style={{marginRight: 20, padding: 10}} ><h3 className="price__size__btn__text">XL</h3></Button>
                <Button ref={xxl} variant="outlined" className="price__size__btn" onClick={handleChangeXXL} style={{marginRight: 20, padding: 10}} ><h3 className="price__size__btn__text">XXL</h3></Button>
            </div>
            <div>
                <FormControl class="price__grid__form" className={classes.formControl}>
                    <Select
                        value={quantity}
                        onChange={quant_control}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'kOhO': 'Without label' }}
                    >
                    <MenuItem value={0}>
                        <strong style={{color: "green"}}>{(data.quantity)?data.quantity:"Quantity"}</strong>
                    </MenuItem>
                    {(fitquantity!=0)?Array.from(Array(parseInt(fitquantity)), (e, i) => { 
                        return(
                            <MenuItem value={i+1}>{i+1}</MenuItem>
                        )
                    }):""}
                    </Select>
                </FormControl>
            </div>
            <Button ref={bagref} onClick={addtobag} className="price__bag" variant="contained" color="secondary" style={{color: "white",width: 400,marginTop: 12}}>Add to Bag</Button>
            <h4 style={{marginTop: 10}}>Delivery Details</h4>
            <TextField className="price__deliverypin" label="Enter Pincode" variant="outlined" size="small" style={{marginLeft: 30,marginBottom: 30,marginTop: 5}} />
            <Button className="price__delivery" style={{marginTop: 5,backgroundColor: "gray", color: "white"}} variant="contained">Check</Button>
            <h1 className="price__delstatus" style={{textAlign: "center", fontSize: 25 }}>Hurray Delivery Available</h1>
        </div>
    ) 
}
// visibility: "hidden"
export default Price