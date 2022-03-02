import React from 'react';

const Input = ({title ,defaultValue}) => {
    return (
        <>
            <h3>{title ? title : ''}</h3>
            <input defaultValue={defaultValue ? defaultValue : ''} type="text"/>
        </>
    );
};

export default Input;