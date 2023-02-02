import React from 'react';
import { Form } from 'react-bootstrap';

const Input = (
    {
        type = "text",
        invalid = false,
        placeholder,
        value,
        setValue,
        disabled = false
    }: any) => {
    return (
        <Form.Control
            type={type}
            value={value}
            onChange={(e) => { setValue(e.target.value) }}
            placeholder={placeholder}
            isInvalid={invalid}
            disabled={disabled}
            style={
                {
                    margin: "10px 0"
                }
            }
        />
    );
};

export { Input };