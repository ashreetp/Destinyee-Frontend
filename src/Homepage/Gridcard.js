import React from 'react'
import './Gridcard.css'
import { useSpring, animated } from 'react-spring'

function Gridcard({name,imgsrc}) { 
    const props = useSpring({ 
        from: { opacity: 0, y:-10  }, 
        to: { opacity: 1, y:0 }, 
        config: { duration: 500, },
        delay: 1000
    })
    return (
        <animated.div style={props} className="Gridcard">
            <img className="Gridcard__img" src={(imgsrc!=null)?imgsrc:""} />
            <h3>{name}</h3>
        </animated.div>
    )
}

export default Gridcard
