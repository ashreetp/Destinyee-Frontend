import React from 'react' 
import './Picked.css'
import Selecteditem from './Selecteditem.js'

function Picked({data,callback}) {
    return (
        <div className="picked">
            {(data != null)?
                data.map((dat)=>{
                    return(
                        <Selecteditem callback={callback} data={dat} />
                    )
                }) 
            :""}
        </div>
    )
}

export default Picked
