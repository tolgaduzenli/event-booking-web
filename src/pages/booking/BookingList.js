import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import BookingCard from "./BookingCard";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
}));
export default function BookingList(props) {
    const classes = useStyles();
    const { bookings, handleBookingCancel } = props;
    return (
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
                {bookings.map((booking) => (
                    <GridListTile key={booking._id}>
                        <BookingCard booking={booking} handleBookingCancel={handleBookingCancel}/>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}
