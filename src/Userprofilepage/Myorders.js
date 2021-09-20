import React,{useEffect} from 'react'
import './Myorders.css'
import axios from './../axios.js'
import {useSelector} from 'react-redux'
import {selectUser} from './../Redux/userSlice.js'
import Order from './Order.js'

function Myorders() {
    const user = useSelector(selectUser);
    const [orders,setOrders] = React.useState(null);

    useEffect(()=>{
        async function fetch(){
            const response = await axios.get(`/users/data/${user}`).then(({data})=>{
                setOrders(data.orders.reverse())
            })
        }
        fetch();
    },[])
    return (
        <div>
            {(orders!=null)?
                orders.map((data)=>{
                    return(
                        <div className="order__insideout">
                            {data.map(dat=>{
                                return(
                                    <Order data={dat} />
                                )
                            })}
                        </div>
                    )
                })
            :""}
        </div>
    )
}

export default Myorders
