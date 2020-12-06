import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import moment from "moment";
import { useAuthContext } from "../../context/AuthContext";
import { dateTimeFormat } from "../../constants/StaticTexts";
import { apiCall } from "../../Utils/ApiCalls";
import Button from "@material-ui/core/Button";
import ConfirmationDialogContent from "../../components/dialog/ConfirmationDialogContext";
import CustomDialog from "../../components/dialog/CustomDialog";
import SuccessMessage from "../../components/message/SuccessMessage";
import ErrorTextDisplay from "../../components/error/ErrorTextDisplay";

export default function EventDetails(props) {
    const { closeDialog, event } = props;
    const { isTokenValid, token } = useAuthContext();

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState(0);
    const [date, setDate] = useState();
    const [eventBookedByUser, setEventBookedByUser] = useState(false);

    const [openEventBookingConfirmationDialog, setOpenEventBookingConfirmationDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [message, setMessage] = useState();

    const loadUserBookingByEventId = async (eventId) => {
        setLoading(true);
        let requestBody = {
            query: `query { bookedEventByEventId(eventId: "${eventId}") { _id event { _id title description price date } } }`
        };
        const res = await apiCall(requestBody, token);
        if (res.status !== 200 && res.status !== 201) {
            setError('Events loading failed!');
        } else if (res.data.data.bookedEventByEventId) {
            setEventBookedByUser(!!res.data.data.bookedEventByEventId);
            setMessage('Event already booked')
            setError();
        }
        setLoading(false);
    }

    const bookEvent = async (eventId) => {
        let requestBody = {
            query: `mutation { bookEvent(eventId: "${eventId}") { _id} }`
        };
        const res = await apiCall(requestBody, token);
        if (res.status !== 200 && res.status !== 201) {
            setError('Event booking failed!');
        } else if (res.data.data.bookEvent) {
            setMessage('Booking successfully completed');
            setEventBookedByUser(true);
            setError();
        }
        setOpenEventBookingConfirmationDialog(false);
    }

    useEffect(() => {
        if (event && isTokenValid) {
            loadUserBookingByEventId(event._id);
        }
        if (event) {
            setTitle(event.title);
            setDescription(event.description);
            setPrice(event.price);
            setDate(event.date);
        }
    }, [event, isTokenValid])

    return (
        <Grid container spacing={2} direction="column" style={{ minWidth: 500, paddingBottom: 20 }}>
            <Grid item xs={12}><Typography>{title}</Typography></Grid>
            <Grid item xs={12}><Typography>{description}</Typography></Grid>
            <Grid item xs={12}><Typography>£{price}</Typography></Grid>
            <Grid item xs={12}><Typography>{moment(date).format(dateTimeFormat)}</Typography></Grid>
            {message && <SuccessMessage message={message}/>}
            <ErrorTextDisplay text={error}/>
            <Grid container item xs={12} justify="flex-end">
                <Button size="small" variant="outlined" onClick={closeDialog}>Close</Button>
                {!loading && !eventBookedByUser &&
                <Button style={{ marginLeft: 20 }}
                        variant="outlined"
                        onClick={() => setOpenEventBookingConfirmationDialog(true)} size="small"
                        color="primary">Book</Button>}
            </Grid>
            <CustomDialog
                modalTitle="Event Booking Confirmation"
                open={openEventBookingConfirmationDialog}
                handleClose={() => setOpenEventBookingConfirmationDialog(false)}
            >
                <ConfirmationDialogContent
                    message="Do you want to book selected event?"
                    handleLeftButtonClick={() => setOpenEventBookingConfirmationDialog(false)}
                    handleRightButtonClick={() => bookEvent(event._id)}
                />
            </CustomDialog>
        </Grid>
    )
}
