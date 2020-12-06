import React from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import { ACTION_EDIT } from "../../constants/StaticTexts";
import { Button } from "@material-ui/core";

export default function SaveCancelButtonPair(props) {
    const { cancelClickHandler, action, saveClickHandler } = props;
    let saveButtonName = action === ACTION_EDIT ? 'update' : 'save'

    return (
        <Grid container item xs={12} justify="flex-end" spacing={2}>
            <Grid container item xs={3} md={2} justify="flex-end">
                <Button variant="contained" color="default" onClick={cancelClickHandler}>Cancel</Button>
            </Grid>
            <Grid container item xs={4} md={3} justify="flex-end">
                <Button onClick={saveClickHandler} variant="contained" color="primary">{saveButtonName}</Button>
            </Grid>
        </Grid>
    )
}

SaveCancelButtonPair.defaultProps = {
    disableSaveButton: false,
}

SaveCancelButtonPair.propTypes = {
    disableSaveButton: PropTypes.bool,
    cancelClickHandler: PropTypes.func,
    action: PropTypes.string,
    saveClickHandler: PropTypes.func,
    primaryButtonName: PropTypes.string,
}
