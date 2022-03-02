import React from 'react';
import './Input.css'

const Input = ({title ,defaultValue}) => {
    return (
        <div className='input-block'>
            <div className='input-title'>{title ? title : ''}</div>
            <input
                defaultValue={defaultValue === undefined ?  '' : defaultValue}
                type="text"
                className='about-input'
            />
        </div>
    );
};

export default Input;