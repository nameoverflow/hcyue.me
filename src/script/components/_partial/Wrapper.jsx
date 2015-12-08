import React from 'react'

const Wrapper = ({show, children}) => {
    return (
        <div id="wrapper" style={
            show ? {
                transform: 'translateX(0)',
                opacity: '1'
            } : {
                transform: 'translateX(100px)',
                opacity: '0'
            }
        }>
        {children}
        </div>
    );
}
export default Wrapper; 