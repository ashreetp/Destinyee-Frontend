import React,{useState} from 'react'
import './Admincontrol.css'
import Adminupload from './Adminupload'
import Adminedit from './Adminedit'
import {Button} from '@material-ui/core'

function Admincontrol({myfun}) {
    const [aupload, setAupload] = useState(1)
    const [aedit, setAedit] = useState(0)

    return (
        <div className="admincontrol">
            <div className="admincontrol__selector">
                <Button variant="outlined" className="admincontrol__btn" onClick={()=>{setAupload(1);setAedit(0)}}>Upload</Button>        
                <Button variant="outlined" className="admincontrol__btn" onClick={()=>{setAedit(1);setAupload(0)}}>Edit</Button>
            </div>
            {(aupload == 1)?
                <Adminupload myfun={myfun} />
            :""}
            {(aedit == 1)?
                <Adminedit myfun={myfun} />
            :""}
        </div>
    )
}

export default Admincontrol
