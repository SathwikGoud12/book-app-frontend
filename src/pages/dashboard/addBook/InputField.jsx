import React from 'react';
import './InputField.css';

const InputField = ({ label, name, type = 'text', register, placeholder }) => {
    return (
        <div className="input-field-container">
            <label className="input-field-label">{label}</label>
            <input
                type={type}
                {...register(name, { required: true })}
                className="input-field-input"
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;