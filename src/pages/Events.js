import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { apiCall } from '../Utils/ApiCalls';
import EventCard from '../components/EventCard'

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        setLoading(true);
        let requestBody = {
            query: "query { events { _id title description price date creator { _id } } }"
        };
        apiCall(requestBody)
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    setError('Events loading failed!');
                } else if (res.data.data.events) {
                    setEvents(res.data.data.events)
                    setError();
                }
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setError('Events loading failed! Please try again later.');
                console.log(err);
            })
    }, []);

    return (
        <Grid container style={{ marginTop: '2rem' }}>
            {events && events.length > 0 &&
                Object.values(events).map(event => {
                    return (
                        <Grid key={event._id} item xs={3}><EventCard event={event} /></Grid>
                    );
                })
            }
        </Grid>
    )
}