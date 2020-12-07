import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { dateTimeFormat } from "../../constants/StaticTexts";

export default function EventCardContentArea(props) {
    const { event } = props;

    const [descPreview, setDescPreview] = useState([]);
    const { title, price, description, date } = event || {};

    useEffect(() => {
        let tempDesc = description ? description.split(' ', 6) : [];
        if (tempDesc.length > 5) {
            tempDesc = tempDesc.join(' ') + '...';
        } else {
            tempDesc = description;
        }
        setDescPreview(tempDesc);
    }, [description]);

    return (
        <CardContent>
            <Grid container direction="column">
                <Typography gutterBottom variant="h5" component="h2">{title}</Typography>
                <Typography>{descPreview}</Typography>
                <Grid container item xs={12} alignItems="center" justify="space-between">
                    <Typography variant="body2" color="textSecondary"
                                component="p">{moment(date).format(dateTimeFormat)}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{`${price} £`}</Typography>
                </Grid>
            </Grid>
        </CardContent>
    );
}
