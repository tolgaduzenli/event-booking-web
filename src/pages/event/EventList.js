import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import EventCard from "./EventCard";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        height: 'auto',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: 'auto',
    },
    gridListItem: {
        maxWidth: 345,
        height: 180,
    },
}));
export default function EventList(props) {
    const classes = useStyles();
    const { events, handleEditEvent, handleViewDetails, handleDeleteEvent } = props;
    return (
        <div className={classes.root}>
            <GridList className={classes.gridList}>
                {events.map((event) => (
                    <GridListTile key={event._id} className={classes.gridListItem}>
                        <EventCard event={event} handleDeleteEvent={handleDeleteEvent} handleEditEvent={handleEditEvent}
                                   handleViewDetails={handleViewDetails}/>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}
