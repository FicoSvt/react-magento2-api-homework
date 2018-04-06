import React from 'react';

const Loader = (props) => {
    return (
        <div className="ui-loader__container">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader;