import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { apiCall } from '../../Utils/ApiCalls';
import ShareEvent from "./ShareEvent";
import { ACTION_DELETE, ACTION_EDIT, ACTION_FETCH } from "../../constants/StaticTexts";
import EventList from "./EventList";
import CreateEventDialog from "./CreateEventDialog";
import CustomDialog from "../../components/dialog/CustomDialog";
import { useAuthContext } from "../../context/AuthContext";
import CustomCircularLoading from "../../components/loading/CustomCircularLoading";
import ErrorTextDisplay from "../../components/error/ErrorTextDisplay";
import DataNotFoundMessage from "../../components/message/DataNotFoundMessage";
import EventDetails from "./EventDetails";
import ConfirmationDialogContent from "../../components/dialog/ConfirmationDialogContext";

export default function Events(props) {
    const { history } = props;
    const { token } = useAuthContext();

    const [selectedEvent, setSelectedEvent] = useState();
    const [selectedAction, setSelectedAction] = useState();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [openCreateEventDialog, setOpenCreateEventDialog] = useState(false);
    const [openEventDetailsDialog, setOpenEventDetailsDialog] = useState(false);
    const [openEventDeleteDialog, setOpenEventDeleteDialog] = useState(false);

    const loadEvents = async () => {
        setLoading(true);
        let requestBody = {
            query: "query { events { _id title description price date creator { _id } booked } }"
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

    const deleteEvent = async () => {
        let requestBody = {
            query: `mutation { deleteEvent(eventId: "${selectedEvent._id}") }`
        };
        const res = await apiCall(requestBody, token);
        if (res.status !== 200 && res.status !== 201) {
            setError('Event delete failed!');
            closeDialogHandler();
        } else if (res.data.data.deleteEvent === 'Item deleted') {
            closeDialogHandler(ACTION_FETCH);
            setError();
        }
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

    const handleDeleteEvent = (selectedItem) => {
        setSelectedAction(ACTION_DELETE);
        setSelectedEvent(selectedItem);
        setOpenEventDeleteDialog(true);
    }

    const closeDialogHandler = async (message) => {
        if (message === ACTION_FETCH) {
            await loadEvents()
        }
        setOpenCreateEventDialog(false);
        setOpenEventDetailsDialog(false);
        setOpenEventDeleteDialog(false);
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
                    <EventList events={events} handleDeleteEvent={handleDeleteEvent} handleEditEvent={handleEditEvent}
                               handleViewDetails={handleViewDetails}/>
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
                <EventDetails event={selectedEvent} closeDialog={closeDialogHandler} history={history}/>
            </CustomDialog>
            <CustomDialog
                modalTitle="Event Delete Confirmation"
                open={openEventDeleteDialog}
                handleClose={closeDialogHandler}
            >
                <ConfirmationDialogContent message="Do you want to delete selected event?"
                                           handleLeftButtonClick={closeDialogHandler}
                                           handleRightButtonClick={deleteEvent}
                />
            </CustomDialog>
        </Grid>
    )
}
