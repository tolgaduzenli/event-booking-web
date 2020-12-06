import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useAuthContext } from "../../context/AuthContext";
import { apiCall } from "../../Utils/ApiCalls";
import CustomDialog from "../../components/dialog/CustomDialog";
import BookingList from "./BookingList";
import ConfirmationDialogContent from "../../components/dialog/ConfirmationDialogContext";
import CustomCircularLoading from "../../components/loading/CustomCircularLoading";
import ErrorTextDisplay from "../../components/error/ErrorTextDisplay";
import DataNotFoundMessage from "../../components/message/DataNotFoundMessage";

export default function Bookings() {
    const { isTokenValid, token } = useAuthContext();

    const [selectedBookingId, setSelectedBookingId] = useState();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

    const loadBookings = async () => {
        setLoading(true);
        let requestBody = {
            query: "query { bookings { _id event { _id title description price date creator { _id } } } }"
        };
        const res = await apiCall(requestBody, token);
        if (res.status !== 200 && res.status !== 201) {
            setError('Bookings loading failed!');
        } else if (res.data.data.bookings) {
            setBookings(res.data.data.bookings)
            setError();
        }
        setLoading(false);
    }

    const cancelBooking = async () => {
        setLoading(true);
        let requestBody = {
            query: `mutation { cancelBooking(bookingId: "${selectedBookingId}") { _id} }`
        };
        const res = await apiCall(requestBody, token);
        if (res.status !== 200 && res.status !== 201) {
            setError('Booking cancel failed!');
        } else if (res.data.data) {
            await loadBookings();
        }
        setLoading(false);
        setSelectedBookingId();
        setOpenConfirmationDialog(false);
    }

    const handleBookingCancel = (id) => {
        setSelectedBookingId(id);
        setOpenConfirmationDialog(true);
    }

    const closeDialogHandler = async () => {
        setOpenConfirmationDialog(false);
        setSelectedBookingId();
        await loadBookings();
    }

    useEffect(() => {
        if (isTokenValid) {
            loadBookings();
        }
    }, [token])

    if (loading) {
        return (<CustomCircularLoading/>)
    }

    return <Grid container style={{ paddingTop: '2rem' }} justify="center" spacing={4}>
        <ErrorTextDisplay text={error}/>
        {bookings && bookings.length > 0 ?
            <Grid container item xs={12}>
                <BookingList bookings={bookings} handleBookingCancel={handleBookingCancel}/>
            </Grid>
            :
            <DataNotFoundMessage/>}
        <CustomDialog
            modalTitle="Booking Cancel Confirmation"
            open={openConfirmationDialog}
            handleClose={closeDialogHandler}
        >
            <ConfirmationDialogContent
                message="Do you want to cancel your booking?"
                handleLeftButtonClick={closeDialogHandler}
                handleRightButtonClick={cancelBooking}
            />
        </CustomDialog>
    </Grid>
}
