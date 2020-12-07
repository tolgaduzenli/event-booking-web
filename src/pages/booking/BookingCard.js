import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import EventCardContentArea from "../event/EventCardContentArea";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        backgroundColor: '#e3f2fd',
    },
});

export default function BookingCard(props) {
    const classes = useStyles();
    const { booking, handleBookingCancel } = props;
    const { event } = booking || {};

    return (
        <Card className={classes.root}>
            <EventCardContentArea event={event}/>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    onClick={() => handleBookingCancel(booking._id)}>Cancel
                    Booking
                </Button>
            </CardActions>
        </Card>
    );
}
