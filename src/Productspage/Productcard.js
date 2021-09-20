import React from 'react'
import './Productcard.css'
import { useSpring, animated } from 'react-spring'

function Productcard(data) {
    const props = useSpring({ 
        from: { opacity: 0, transform: "scale(0.5)" }, 
        to: { opacity: 1, transform: "scale(1)"}, 
        config: { duration: 300, },
        delay: 500
        // loop: { reverse: true},
    })
    return (
        <animated.div style={props} className="Productcard">
            <img className="Productcard__img" src={data.data.img} />
            <h2>{data.data.name}</h2>
            <h3>{data.data.price}</h3>
        </animated.div>
    )
}

export default Productcard
