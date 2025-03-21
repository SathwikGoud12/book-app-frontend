import React from 'react';

const SelectField = ({ label, name, options, register, validation, error }) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <select {...register(name, validation)} className={error ? "input-error" : ""}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="error-message">{error.message}</p>}
        </div>
    );
};

export default SelectField;