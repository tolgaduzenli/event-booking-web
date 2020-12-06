import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { useAuthContext } from "../../context/AuthContext";
import EventCardActionArea from "./EventCardActionArea";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        backgroundColor: '#e3f2fd',
    },
});

export default function EventCard(props) {
    const classes = useStyles();
    const { event, handleEditEvent, handleViewDetails } = props;
    const { userId } = useAuthContext();

    const { creator } = event || {};
    const { _id: creatorId } = creator || {}

    return (
        <Card className={classes.root}>
            <EventCardActionArea event={event}/>
            <CardActions>
                {creatorId !== userId ?
                    <Button size="small" color="primary" onClick={() => handleViewDetails(event)}>View Details</Button>
                    :
                    <Button onClick={() => handleEditEvent(event)} size="small" color="primary">Edit</Button>
                }
            </CardActions>
        </Card>
    );
}
