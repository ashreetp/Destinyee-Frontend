import React from 'react'
import './Debitcreditcard.css'
import {TextField,Button} from '@material-ui/core';


function Debitcreditcard() {
    return (
        <div className="dccard__main">
            <div className="dccard">
                <TextField className="dccard__cardnum" label="Card Number" variant="outlined" size="small" />
                <TextField className="dccard__name" label="Name On Card" variant="outlined" size="small" />
                <div className="dccard__two" style={{display:"flex"}}>
                    <TextField className="dccard__exp" label="Expiry" variant="outlined" size="small" />
                    <TextField className="dccard__cvv" label="CVV" variant="outlined" size="small" />
                </div>
            </div>
            <h3 className="dccard__txt">This transaction you make is totally secure. We don't save your CVV number.</h3>
            <Button variant="contained" className="dccard__btn">PAY NOW</Button>
        </div>
    )
}

export default Debitcreditcard
