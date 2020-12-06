import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

export default function CustomTextField(props) {
    const {
        fullWidth,
        name,
        defaultValue,
        value,
        label,
        variant,
        required,
        type,
        error,
        helperText,
        onChangeHandler,
        InputProps,
        autoFocus,
        disabled,
        multiline,
        defaultHelperText,
        rowsMax,
        rows,
    } = props;
    return (
        <TextField
            fullWidth={fullWidth}
            defaultValue={defaultValue}
            value={value}
            id={name}
            name={name}
            type={type}
            required={required}
            label={label}
            variant={variant}
            error={error}
            helperText={error ? helperText : defaultHelperText}
            onChange={onChangeHandler}
            InputProps={InputProps}
            autoFocus={autoFocus}
            disabled={disabled}
            multiline={multiline}
            rowsMax={rowsMax}
            rows={rows}
        />
    );
}

CustomTextField.defaultProps = {
    fullWidth: true,
    variant: "outlined",
    type: "text",
    required: false,
    autoFocus: false,
    error: false,
    helperText: null,
    disabled: false,
    multiline: false,
    defaultHelperText: null,
    rowsMax: 4,
    rows: 1,
};

CustomTextField.propTypes = {
    fullWidth: PropTypes.bool,
    required: PropTypes.bool,
    variant: PropTypes.string,
    error: PropTypes.bool,
    onChangeHandler: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    InputProps: PropTypes.object,
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    multiline: PropTypes.bool,
    defaultHelperText: PropTypes.string,
    rowsMax: PropTypes.number,
    rows: PropTypes.number,
};
