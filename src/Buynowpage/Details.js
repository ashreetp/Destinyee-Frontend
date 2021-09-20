import React,{useEffect,useState} from 'react'
import './Details.css'

function Details(data) {
    const [heading,setHeading] = useState(null)
    const [description,setDescription] = useState(null)

    useEffect(() => {
		function fetchPosts() {
			if(data.data != null){
               let heads=[]
               let descs=[]
                data.data.description.map((dat)=>{
                    heads.push(dat[0])
                    descs.push(dat[1])
               })
               setHeading(heads)
               setDescription(descs)
            }
            return;
		}
		fetchPosts();
	}, [data]);

    return (
        <div className="details">
            <div className="details__left">
                {(heading != null && description != null)?<>
                        <h3>{heading[0]}</h3>
                        <p>{description[0]}</p>
                    
                        <h3 style={{marginTop: 30}}>{heading[1]}</h3>
                        <p>{description[1]}</p>

                        <h3 style={{marginTop: 30}}>{heading[2]}</h3>
                        <p>{description[2]}</p>
                    </>
                :""}
            </div>
            <div className="details__right">
                {(heading != null && description != null)?<>
                    <h3>{heading[3]}</h3>
                    <p>{description[3]}</p>
                </>
                :""}
            </div>
        </div>
    )
}

export default Details
