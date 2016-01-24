import React from 'react'

const Wrapper = ({children, show}) =>
    <div id="wrapper" className={show ? "show" : ""}>
        { children }
    </div>
    
export default Wrapper; 