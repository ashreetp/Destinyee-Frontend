import React,{useEffect,useState} from 'react';
import './Carousal.css';
import Herocard from './Herocard.js'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";
import axios from './../axios.js'

function Carousal() {
  const [herocard,setHerocard] = useState(null);

    useEffect(() => {
		async function fetchPosts() {
			const response = await axios.get("/shop/homepage").then((res)=>{
            let heroes=[]
            res.data.map((dat)=>{
                if(dat.type==="herocard")
                    heroes.push({imgsrc: dat.img})
            })
                setHerocard(heroes)
                // console.log(heroes)
            })
            return response;
		}
		fetchPosts();
	}, []);

    var settings = {
      pauseOnHover: true,
      className: "center",
      centerMode: true,
      centerPadding: "0px",
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 300,
      autoplaySpeed: 1500,
      slidesToShow: 3,
      slidesToScroll: 1,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        }
      ]
    };
    return (
        <div className="Carousal__main">
          <Slider {...settings}>
            {(herocard!=null)?herocard.map(({imgsrc}) => {
              return(
                <Link key={imgsrc} style={{textDecoration: "none",color: "inherit"}} to='/products/men-plain-tshirts'><Herocard imgsrc={imgsrc} /></Link>
              )
            }):""}
          </Slider>
        </div>
    );
  }

  export default Carousal;