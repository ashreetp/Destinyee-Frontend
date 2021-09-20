import React,{useEffect,useState} from 'react'
import './Buynow.css'
import Navbar from '../Homepage/Navbar.js'
import "react-image-gallery/styles/css/image-gallery.css"
import ImageGallery from 'react-image-gallery';
import Footer from './../Homepage/Footer.js'
import Details from './Details.js'
import Price from './Price.js'
import axios from './../axios.js'
import { useSelector } from 'react-redux';
import {selectUser} from './../Redux/userSlice'
import ReactLoading from 'react-loading';

function Buynow(props) {
    const user=useSelector(selectUser)
    const [product,setProduct] = useState(null);
    const [images,setImages] = useState([]);
    const [axdata,setAxdata] = useState(0);

    useEffect(() => {
    async function fetchPosts() {
      document.querySelector("body").scrollTo(0,0)
      const response = await axios.get("/shop/products").then((res)=>{
          let myprod;
          res.data.map((dat)=>{
              if(dat.prod_id===props.match.params.id){
                myprod=dat
                setProduct(dat) 
              }
          })
          let img_det=[]
          myprod.gallary.map((dat)=>{
            img_det.push({
              original: dat,
              thumbnail: dat
            })
          })
          setImages(img_det)
          setAxdata(1)
      })
      return response;
    }

		fetchPosts();
	}, []);

    return (
        <>
          {(axdata==0)?
                <div className="loading">
                    <div className="loading__inner">
                        <ReactLoading color={"white"} type={"spin"} height={100} width={100} />
                    </div>
                </div>
            :""}
            <Navbar />
            <div className="buynow__main">
              <div className="buynow__gallary">
                  <div className="butnow__gallary__imggal">
                    <ImageGallery items={images} showNav={false} thumbnailPosition={"left"} showPlayButton={false} />
                  </div>
                    <div className="buynow__mobile">
                      <ImageGallery items={images} showNav={false} thumbnailPosition={"bottom"} showPlayButton={false} />
                    </div>
                  <Price data={product} />
              </div>
              <Details data={product}/>
            </div>
            <Footer />
        </>
    )
}

export default Buynow
