import React from "react";
import moment from "moment";
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import { IconButton, InputAdornment } from "@material-ui/core";
import EventIcon from '@material-ui/icons/Event';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export default function CustomDateTimePicker(props) {
    const {
        date, label, handleDateChange, disablePast, format, minDate,
        maxDate, readOnly, showTodayButton, error, helperText, errorText, disabled
    } = props;

    return (
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
            <DateTimePicker
                inputVariant="outlined"
                label={label}
                id={label}
                name={label}
                value={date}
                onChange={handleDateChange}
                disabled={disabled}
                disablePast={disablePast}
                readOnly={readOnly}
                format={format}
                minDate={minDate}
                maxDate={maxDate}
                showTodayButton={showTodayButton}
                error={error}
                helperText={error ? errorText : helperText}
                style={{ width: '100%' }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <EventIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </MuiPickersUtilsProvider>
    );
}

CustomDateTimePicker.defaultProps = {
    disablePast: true,
    readOnly: false,
    disabled: false,
    showTodayButton: true,
    format: 'DD/MM/YYYY HH:mm',
}

CustomDateTimePicker.propTypes = {
    disablePast: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    format: PropTypes.string,
    todayLabel: PropTypes.string,
    showTodayButton: PropTypes.bool,
}
