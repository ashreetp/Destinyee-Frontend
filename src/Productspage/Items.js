import React,{useEffect,useState} from 'react'
import './Items.css'
import Productcard from './Productcard.js'
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux'
import {selectChanged_products, selectRefresh_products} from './../Redux/shopSlice'

function Items() {
    const items = useSelector(selectChanged_products)
    const refresh = useSelector(selectRefresh_products)

    useEffect(() => {
		function fetchPosts() {
            return ;
		}
		fetchPosts();
	}, [refresh])        
    
    return (
        <div className="Items">
            {(items!=null)?
                items.map(data => {
                    return (
                        <Link style={{textDecoration: "none",color: "inherit"}} to={`/buynow/${data.prod_id}`}><Productcard key={data.prod_id} data={data} /></Link>
                    )
                })
            :""}
        </div>
    )
}

export default Items
