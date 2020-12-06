import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import EventCard from "./EventCard";

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
export default function EventList(props) {
    const classes = useStyles();
    const { events, handleEditEvent, handleBookEvent } = props;
    return (
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
                {events.map((event) => (
                    <GridListTile key={event._id}>
                        <EventCard event={event} handleEditEvent={handleEditEvent} handleBookEvent={handleBookEvent}/>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}
