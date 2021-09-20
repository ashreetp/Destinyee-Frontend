import React,{useState} from 'react'
import './Adminupload.css'
import {TextField,Button} from '@material-ui/core'
import axios from './../axios.js'
import ReactLoading from 'react-loading';

function Adminupload({myfun}) {
    const imgref = React.useRef()
    const galref = React.useRef()
    const [prod_id,setProd_id] = React.useState('')
    const [tag,setTag] = React.useState('')
    const [name,setName] = React.useState('')
    const [price,setPrice] = React.useState('')
    const [design,setDesign] = React.useState('')
    const [fit,setFit] = React.useState('')
    const [description,setDescription] = React.useState('')
    const [size,setSize] = React.useState('')
    const [axdata,setAxdata] = useState(1);

    const send = () => {
        myfun(0)
        const imgdata = new FormData();
        imgdata.append("image", imgref.current.files[0]);
        imgdata.append("prod_id", prod_id );
        
        const galdata = new FormData();
        for(let i=0;i<galref.current.files.length;i++){
            galdata.append(`${i}`, galref.current.files[i]);
        }
        
        const transport = {
            prod_id: prod_id,
            tag: tag,
            name: name,
            price: parseInt(price),
            fit: fit,
            design: design,
            size: size,
            description: description
        }
        axios.post('/admin/upload-product',transport).then(()=>{
            axios.post('/send-img',imgdata).then(()=>{
                axios.post('/send-img',galdata).then((res)=>{
                    myfun(1)
                    alert("Successfully Added to Products")
                }).catch(err=>{
                    myfun(1)
                    alert(err)
                })        
            }).catch(err=>{
                myfun(1)
                alert(err)
            })        
        }).catch(err=>{
            myfun(1)
            alert(err)
        })
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
            <div className="adminupload">
                <TextField className="adminupload__txtfields" onChange={(e)=>{setProd_id(e.target.value)}} variant="outlined" label="Product ID" size="small" />            
                <TextField className="adminupload__txtfields" onChange={(e)=>{setTag(e.target.value)}} variant="outlined" label="Tag" size="small" />            
                <TextField className="adminupload__txtfields" onChange={(e)=>{setName(e.target.value)}} variant="outlined" label="Name" size="small" />            
                <TextField className="adminupload__txtfields" onChange={(e)=>{setPrice(e.target.value)}} variant="outlined" label="Price" size="small" />            
                <TextField className="adminupload__txtfields" onChange={(e)=>{setDesign(e.target.value)}} variant="outlined" label="Design" size="small" />            
                <TextField className="adminupload__txtfields" onChange={(e)=>{setFit(e.target.value)}} variant="outlined" label="Fit" size="small" />            
                <TextField className="adminupload__txtfields" onChange={(e)=>{setDescription(e.target.value)}} multiline={true} rows={10} variant="outlined" label="Description" size="small" />            
                <TextField className="adminupload__txtfields" onChange={(e)=>{setSize(e.target.value)}} multiline={true} rows={2} variant="outlined" label="Size" size="small" />
                <input ref={imgref} type="file" label="Main Image" />
                <input ref={galref} type="file" multiple label="Gallary" />
                <Button onClick={send} variant="contained">Send</Button>
            </div>
        </>
    )
}

export default Adminupload
