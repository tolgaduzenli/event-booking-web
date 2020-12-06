import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { apiCall } from '../../Utils/ApiCalls';
import ShareEvent from "./ShareEvent";
import { ACTION_EDIT, ACTION_FETCH } from "../../constants/StaticTexts";
import EventList from "./EventList";
import CreateEventDialog from "./CreateEventDialog";
import CustomDialog from "../../components/dialog/CustomDialog";
import { useAuthContext } from "../../context/AuthContext";
import CustomCircularLoading from "../../components/loading/CustomCircularLoading";
import ErrorTextDisplay from "../../components/error/ErrorTextDisplay";
import DataNotFoundMessage from "../../components/message/DataNotFoundMessage";
import ConfirmationDialogContent from "../../components/dialog/ConfirmationDialogContext";
import EventDetails from "./EventDetails";

export default function Events(props) {
    const { history } = props;
    const { isTokenValid, token } = useAuthContext();

    const [selectedEvent, setSelectedEvent] = useState();
    const [selectedAction, setSelectedAction] = useState();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [openCreateEventDialog, setOpenCreateEventDialog] = useState(false);
    const [openEventDetailsDialog, setOpenEventDetailsDialog] = useState(false);

    const loadEvents = async () => {
        setLoading(true);
        let requestBody = {
            query: "query { events { _id title description price date creator { _id } } }"
        };
        const res = await apiCall(requestBody, token);
        if (res.status !== 200 && res.status !== 201) {
            setError('Events loading failed!');
        } else if (res.data.data.events) {
            setEvents(res.data.data.events)
            setError();
        }
        setLoading(false);
    }

    async function handleViewDetails(event) {
        setOpenEventDetailsDialog(true);
        setSelectedEvent(event);
    }

    const handleEditEvent = (selectedItem) => {
        setSelectedAction(ACTION_EDIT);
        setSelectedEvent(selectedItem);
        setOpenCreateEventDialog(true);
    }

    const closeDialogHandler = async (message) => {
        if (message === ACTION_FETCH) {
            await loadEvents()
        }
        setOpenCreateEventDialog(false);
        setOpenEventDetailsDialog(false);
        setSelectedAction();
        setSelectedEvent();
    }

    useEffect(() => {
        loadEvents();
    }, []);

    if (loading) {
        return (<CustomCircularLoading/>)
    }

    return (
        <Grid container style={{ paddingTop: '2rem' }} justify="center" spacing={4}>
            <Grid container item xs={12} justify="center">
                <ShareEvent loadEvents={loadEvents} history={history}/>
            </Grid>
            <ErrorTextDisplay text={error}/>
            {events && events.length > 0 ?
                <Grid container item xs={12}>
                    <EventList events={events} handleEditEvent={handleEditEvent} handleViewDetails={handleViewDetails}/>
                </Grid>
                :
                <DataNotFoundMessage/>}
            <CustomDialog
                modalTitle="Create Event"
                open={openCreateEventDialog}
                handleClose={closeDialogHandler}
            >
                <CreateEventDialog
                    closeDialog={closeDialogHandler}
                    action={selectedAction}
                    originalEvent={selectedEvent}
                />
            </CustomDialog>
            <CustomDialog
                modalTitle="Event Details"
                open={openEventDetailsDialog}
                handleClose={closeDialogHandler}
            >
                <EventDetails event={selectedEvent} closeDialog={closeDialogHandler}/>
            </CustomDialog>
        </Grid>
    )
}
