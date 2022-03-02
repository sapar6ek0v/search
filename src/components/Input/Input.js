import React from 'react';
import './Input.css'

const Input = ({title ,defaultValue}) => {
    return (
        <div className='input-block'>
            <h3>{title ? title : ''}</h3>
            <input
                defaultValue={defaultValue === undefined ?  '' : defaultValue}
                type="text"
                className='about-input'
            />
        </div>
    );
};

export default Input;