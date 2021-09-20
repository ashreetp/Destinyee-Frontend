import React,{useEffect,useState} from 'react'
import Navbar from './../Homepage/Navbar.js'
import Filter from './Filter.js'
import Items from './Items.js'
import './Products.css'
import axios from './../axios.js'
import {useDispatch,useSelector} from 'react-redux'
import {setProducts,selectProducts} from './../Redux/shopSlice'
import FilterListIcon from '@material-ui/icons/FilterList';
import ReactLoading from 'react-loading';

function Products(props) {
    const dispatch = useDispatch()
    const prods = useSelector(selectProducts)
    const [axdata,setAxdata] = useState(0);

    useEffect(() => {
		async function fetchPosts() {
            document.querySelector("body").scrollTo(0,0)
			const response = await axios.get("/shop/products").then((res)=>{
                let prod_det=[]
                res.data.map((dat)=>{
                    if(dat.tag===props.match.params.id)
                        prod_det.push(dat)
                })
                dispatch(setProducts(prod_det))
                setAxdata(1)
            })
            return response;
		}
		fetchPosts();
	}, []);

    const togglefilter = () => {
        let doc = document.querySelector('.Filter')
        if(doc.style.display === "" || doc.style.display === "none"){
            doc.style.cssText="display: block !important";
        } else {
            doc.style.cssText="display: none !important";
        }
    }

    return ( 
        <>
            {(axdata==0)?
                <div className="loading">
                    <div className="loading__inner">
                        <ReactLoading color={"white"} type={"spin"} height={100} width={100} />
                    </div>
                </div>
            :<></>}
            <Navbar />
            <div className="Products" style={{overflow: "hidden"}}>
                <h1 className="Products_heading" style={{fontSize: 25,textAlign: "left",marginTop: 20, marginLeft: 20, fontFamily: 'kOhO'}}>Printed T-Shirts for Men</h1>
                <button onClick={togglefilter} className="Products__filterbtn">
                    <FilterListIcon fontSize={"large"} className="Products__filtericn"/>
                </button>
                <div className="Products__split" style={{marginTop: 20,display: "grid", gridTemplateColumns: "25% 75%", height: "79.2vh"}}>
                    <Filter cur_url={props.match.params.id} className="Products__filter" />
                    <div className="prods__items" style={{overflowY:"scroll",marginLeft: 40}}>
                        <Items cur_url={props.match.params.id} />
                    </div>
                </div> 
            </div>
        </>
    )
}

export default Products
