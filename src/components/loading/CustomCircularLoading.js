import React from "react";
import Grid from '@material-ui/core/Grid';
import CircularProgress from "@material-ui/core/CircularProgress";

export default function CustomCircularLoading() {
    return (
        <Grid container item xs={12} justify="center">
            <CircularProgress style={{ justifyContent: 'center' }}/>
        </Grid>
    );
}
