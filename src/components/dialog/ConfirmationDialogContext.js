import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function ConfirmationDialogContent(props) {
    const {
        handleLeftButtonClick,
        handleRightButtonClick,
        message,
        leftButtonName,
        rightButtonName,
    } = props;

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography id={message} data-testid={message}>{message}</Typography>
            </Grid>
            <Grid container item xs={12} justify="flex-end">
                <Grid item xs={2}>
                    <Button onClick={() => handleLeftButtonClick()} size="small">{leftButtonName}</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={() => handleRightButtonClick()} size="small"
                            color="primary">{rightButtonName}</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

ConfirmationDialogContent.defaultProps = {
    leftButtonName: 'No',
    rightButtonName: 'Yes',
};

ConfirmationDialogContent.propTypes = {
    leftButtonName: PropTypes.string,
    rightButtonName: PropTypes.string,
    handleLeftButtonClick: PropTypes.func,
    handleRightButtonClick: PropTypes.func,
    message: PropTypes.string,
};
