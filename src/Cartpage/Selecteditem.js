import React from 'react'
import './Selecteditem.css'
import {Button} from '@material-ui/core'
import {useSelector} from "react-redux"
import {selectUser} from "./../Redux/userSlice"
import axios from './../axios.js'
import { useSpring, animated } from 'react-spring'

function Selecteditem({data,callback}) {
    const user = useSelector(selectUser)
    const props = useSpring({ 
        from: { transform: "scale(0.7)" }, 
        to: { transform: "scale(1)" }, 
        config: { duration: 100, },
    })

    const removeitem = async () =>{
        const cset = {
            name: data.name,
            username: user,
            prod_id: data.prod_id,
            size: data.size
        }
        await axios.post('/users/remove-cart-item',cset).then(res=>{
            callback('1')
        })
    }
    return (
        <animated.div style={props} className="selecteditem">
            <div className="selecteditem__top">
                <div className="selecteditem__top__left">
                    <h3 style={{fontSize: 22,}}>{data.name}</h3>
                    <h2 style={{fontSize: 17,paddingBottom: 10,marginTop: 0}}>Size : {data.size}</h2>
                    <h2 style={{fontSize: 17,paddingBottom: 10,marginTop: 0}}>Quantity : {data.quantity}</h2>
                    <h3 style={{fontSize: 22,marginTop: -30}}>Rs. {data.price}</h3>
                </div>
                <div className="selecteditem__top__right">
                    <img className="selecteditem__top__right__img" src={data.imgurl} />
                </div>
            </div>
            <div className="selecteditem__grid"> 
                <Button onClick={removeitem} className="selecteditem__btn" variant="contained">Remove</Button>
            </div>
        </animated.div>
    )
}

export default Selecteditem
