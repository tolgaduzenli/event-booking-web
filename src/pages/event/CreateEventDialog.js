import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import moment from "moment";
import CustomDateTimePicker from "../../components/datetime/CustomDateTimePicker";
import { isTextValid } from "../../Utils/StringUtils";
import SaveCancelButtonPair from "../../components/button/SaveCancelButtonPair";
import ErrorTextDisplay from "../../components/error/ErrorTextDisplay";
import CustomTextField from "../../components/textfield/CustomTextField";
import { apiCall } from "../../Utils/ApiCalls";
import { useAuthContext } from "../../context/AuthContext";
import { ACTION_EDIT, ACTION_FETCH, serverDateParamFormat } from "../../constants/StaticTexts";

export default function CreateEventDialog(props) {
    const { closeDialog, action, originalEvent } = props;
    const { token, userId } = useAuthContext();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState(0);
    const [date, setDate] = useState(new Date());

    const [errorMessage, setErrorMessage] = useState('');
    const [validationActive, setValidationActive] = useState(false);
    const [validationError, setValidationError] = useState({
        title: false,
        description: false,
        price: false,
        date: false,
    });

    const handleSaveUpdateClick = async () => {
        setValidationActive(true);
        let requestBody = {
            query: `mutation { createEvent(eventInput: {title: "${title}", description: "${description}", price: ${+price}, date: "${moment(date).format(serverDateParamFormat)}", creator: "${userId}"}) { title, description _id} }`
        };
        if (action === ACTION_EDIT) {
            requestBody = {
                query: `mutation { updateEvent(eventInput: {_id: "${originalEvent._id}", title: "${title}", description: "${description}", price: ${+price}, date: "${moment(date).format(serverDateParamFormat)}"}) { title, description _id} }`
            };
        }
        const res = await apiCall(requestBody, token);
        console.log(res);
        if (res.status !== 200 && res.status !== 201) {
            setErrorMessage('Your request failed!');
        } else if (res.data.data) {
            closeDialog(ACTION_FETCH);
        }
    }

    useEffect(() => {
        let errors = {};
        errors.title = !isTextValid(title);
        errors.description = !isTextValid(description);
        errors.price = price <= 0;
        setValidationError(errors);
        setErrorMessage();
    }, [title, description, price]);

    useEffect(() => {
        if (action === ACTION_EDIT && originalEvent) {
            setTitle(originalEvent.title)
            setDescription(originalEvent.description)
            setPrice(originalEvent.price)
            setDate(originalEvent.date)
        }
    }, [originalEvent, action])

    return (
        <Grid container spacing={2}>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                    <CustomTextField
                        name="title"
                        value={title || ''}
                        label="Title"
                        onChangeHandler={(e) => setTitle(e.target.value)}
                        error={validationActive && validationError.title}
                        helperText="Title is required"
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="description"
                        value={description || ''}
                        label="Description"
                        onChangeHandler={(e) => setDescription(e.target.value)}
                        error={validationActive && validationError.description}
                        helperText="Description is required"
                        required
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
                <Grid item xs={6}>
                    <CustomTextField
                        name="price"
                        value={price}
                        label="Price (£)"
                        type="number"
                        onChangeHandler={(e) => setPrice(+e.target.value)}
                        error={validationActive && validationError.price}
                        helperText="Price is required and must be greater than zero (0)"
                        InputProps={{
                            inputProps: { min: 0 },
                        }}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomDateTimePicker
                        handleDateChange={setDate}
                        date={date}
                        label="Event Date"
                    />
                </Grid>
            </Grid>
            <ErrorTextDisplay text={errorMessage}/>
            <SaveCancelButtonPair
                action={action}
                cancelClickHandler={closeDialog}
                saveClickHandler={handleSaveUpdateClick}
            />
        </Grid>
    )
}
