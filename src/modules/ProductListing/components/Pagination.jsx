import React from 'react';
const Pagination = (props) => {
    return (
        <span onClick={props.pageSwitch} className="ui-pagination__link">{props.pageNumber}</span>
    )
}

export default Pagination;