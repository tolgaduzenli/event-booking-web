import React, { useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import CustomDialog from "../../components/dialog/CustomDialog";
import CreateEventDialog from "./CreateEventDialog";
import { ACTION_FETCH, ACTION_NEW } from "../../constants/StaticTexts";
import { useAuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
    share: {
        border: '1px solid #ffcc44',
    },
}));
export default function ShareEvent(props) {
    const { loadEvents, history } = props;
    const { isTokenValid } = useAuthContext();
    const classes = useStyles();
    const [openCreateEventDialog, setOpenCreateEventDialog] = useState(false);

    function closeDialogHandler(message) {
        if (message === ACTION_FETCH) {
            loadEvents();
        }
        setOpenCreateEventDialog(false)
    }

    function handleCreateEvent() {
        if (isTokenValid) {
            setOpenCreateEventDialog(true)
        } else {
            history.push('auth')
        }
    }

    return (
        <Grid container direction="column" item xs={12} md={3} className={classes.share} justify="center"
              alignItems="center" spacing={4}>
            <Grid item xs={12}>
                <Typography>Share your own events</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateEvent}
                >
                    {isTokenValid ? 'Create Event' : 'Login to Create Event'}
                </Button>
            </Grid>
            <CustomDialog
                modalTitle="Create Event"
                open={openCreateEventDialog}
                handleClose={closeDialogHandler}
            >
                <CreateEventDialog
                    closeDialog={closeDialogHandler}
                    action={ACTION_NEW}
                />
            </CustomDialog>
        </Grid>
    )
}
