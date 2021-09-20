import React from 'react';
import './Herocard.css';

function Herocard({imgsrc}) {
    return (
      <div className="Herocard__main">          
          <img className="Herocard__img" src={imgsrc} />
      </div>
    );
  }
  
  export default Herocard;