import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useAuthContext } from "../../context/AuthContext";
import EventCardActionArea from "./EventCardActionArea";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        height: 180,
        marginRight: 20,
        backgroundColor: '#e3f2fd',
    },
    button: {
        textTransform: 'none',
    },
});

export default function EventCard(props) {
    const classes = useStyles();
    const { event, handleEditEvent, handleViewDetails, handleDeleteEvent } = props;
    const { userId, isTokenValid } = useAuthContext();

    const { creator, booked } = event || {};
    const { _id: creatorId } = creator || {}

    return (
        <Card className={classes.root}>
            <EventCardActionArea event={event}/>
            <CardActions>
                <Button className={classes.button} size="small" color="primary"
                        onClick={() => handleViewDetails(event)}>Details</Button>
                {creatorId === userId && isTokenValid &&
                <Grid container justify="flex-end">
                    <Tooltip title="Edit event">
                        <IconButton onClick={() => handleEditEvent(event)}>
                            <EditIcon color="primary"/>
                        </IconButton>
                    </Tooltip>
                    {!booked ? <Tooltip title="Delete event">
                            <IconButton onClick={() => handleDeleteEvent(event)}>
                                <DeleteIcon color="secondary"/>
                            </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title="Booked event can not be deleted">
                            <IconButton onClick={() => {
                            }}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                </Grid>
                }
            </CardActions>
        </Card>
    );
}
