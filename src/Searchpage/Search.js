import React,{useEffect,useState} from 'react'
import './Search.css'
import Navbar from './../Homepage/Navbar'
import Filter from './../Productspage/Filter'
import Items from './../Productspage/Items'
import {useDispatch,useSelector} from 'react-redux'
import {setProducts,selectProducts,selectRefresh_products} from './../Redux/shopSlice'
import axios from './../axios'
import FilterListIcon from '@material-ui/icons/FilterList';
import ReactLoading from 'react-loading';

function Search(props) {
    const dispatch = useDispatch()
    const prods = useSelector(selectProducts)
    const refresh = useSelector(selectRefresh_products)
    const [axdata,setAxdata] = useState(0);

    useEffect(() => {
		async function fetchPosts() {
            document.querySelector("body").scrollTo(0,0)
			const response = await axios.get("/shop/products").then((res)=>{
                let prod_det=[]
                let query = props.match.params.id.split(' ')
                query.map(word=>{
                    res.data.map((dat)=>{
                        let w = word.toLowerCase();
                        if(dat.design.match(w) || dat.name.match(w) || dat.prod_id.match(w) || dat.tag.match(w)){
                            if(!prod_det.includes(dat))
                                prod_det.push(dat)
                        }
                    })
                })
                dispatch(setProducts(prod_det))
                setAxdata(1)
            })
            return response;
		}
		fetchPosts();
	}, [refresh]);
    
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
            :""}
            <div className="Products" style={{overflow: "hidden"}}>
                <Navbar />
                <h1 className="Products_heading" style={{fontSize: 25,textAlign: "left",marginTop: 20, marginLeft: 20, fontFamily: 'kOhO'}}>Printed T-Shirts for Men</h1>
                <button onClick={togglefilter} className="Products__filterbtn">
                    <FilterListIcon fontSize={"large"} className="Products__filtericn"/>
                </button>
                <div className="Products__split" style={{marginTop: 20,display: "grid", gridTemplateColumns: "25% 75%", height: 461}}>
                    <Filter cur_url={props.match.params.id} className="Products__filter" />
                    <div className="prods__items" style={{overflowY:"scroll",marginLeft: 40}}>
                        <Items cur_url={props.match.params.id} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search
