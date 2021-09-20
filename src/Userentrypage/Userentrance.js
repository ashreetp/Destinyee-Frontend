import React from 'react'
import './Userentrance.css'
import Navbar from './../Homepage/Navbar.js'
import Signin from './Signin.js'
import Signup from './Signup.js'
import ReactLoading from 'react-loading';

function Userentrance() {
    const [axdata,setAxdata] = React.useState(1);
    const axSet = (e) => {
        setAxdata(e)
    }
    return (
        <> 
            {(axdata==0)?
                <div className="loading">
                    <div className="loading__inner">
                        <ReactLoading color={"#f5426c"} type={"bars"} height={100} width={100} />
                    </div>
                </div>
            :""}
            <Navbar />
            <div className="userentrance">
                <Signin myfun={axSet}/>
                <Signup myfun={axSet}/>
            </div>
        </>
    )
}

export default Userentrance
