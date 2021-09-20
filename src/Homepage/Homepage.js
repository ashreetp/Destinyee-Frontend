import React,{useEffect,useState} from 'react'
import './Homepage.css'
import Navbar from './Navbar.js'
import Cateogories from './Cateogories'
import Footer from './Footer.js'
import Carousal from './Carousal.js'
import axios from './../axios.js'
import { useSpring, animated } from 'react-spring'
import ReactLoading from 'react-loading';

function Homepage() {
    const [imgad,setImgad] = useState(null);
    const [axdata,setAxdata] = useState(0);
    const props = useSpring({ 
        from: { opacity: 0 }, 
        to: { opacity: 1 }, 
        config: { duration: 1000, },
        delay: 500
    })
    useEffect(() => {
		async function fetchPosts() {
			const response = await axios.get("/shop/homepage").then((res)=>{
            res.data.map((dat)=>{
                if(dat.type==="imgad")
                    setImgad(dat.img)
            })
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
            <Carousal />
            <animated.div style={props}>
                <img className="home__img" style={{marginTop: 35, width: "100%"}} src={(imgad!=null)?imgad:""} />
            </animated.div>
            <Cateogories />
            <Footer />
        </>
    )
}

export default Homepage
