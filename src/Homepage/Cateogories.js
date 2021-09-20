import React,{useEffect,useState} from 'react'
import './Cateogories.css'
import Gridcard from './Gridcard.js'
import {Link} from "react-router-dom";
import axios from './../axios.js'

function Cateogories() {
    const [cats,setCats] = useState(null);

    useEffect(() => {
		async function fetchPosts() {
			const response = await axios.get("/shop/homepage").then((res)=>{
            let cat_det=[]
            res.data.map((dat)=>{
                if(dat.type==="cat")
                    cat_det.push({img: dat.img, name: dat.name, url: dat.urlpath})
            })
            setCats(cat_det)
            })
            return response;
		}
		fetchPosts();
	}, []);

    return (
        <div className="Cateogories">
            <h3 className="Cateogories__heading">Cateogories for you</h3>
            <div className="Cateogories__grid">
                {(cats!=null)?cats.map(dat=>{
                    return (
                        <Link style={{textDecoration: "none",color: "inherit"}} to={dat.url}><Gridcard name={dat.name} imgsrc={dat.img} /></Link>
                    )
                }):""}
            </div>            
        </div>
    )
}

export default Cateogories
