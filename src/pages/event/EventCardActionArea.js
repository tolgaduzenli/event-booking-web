import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { dateTimeFormat } from "../../constants/StaticTexts";

export default function EventCardActionArea(props) {
    const { event } = props;

    const [descPreview, setDescPreview] = useState([]);
    const { title, price, description, date } = event || {};

    useEffect(() => {
        let tempDesc = description ? description.split(' ', 10) : [];
        if (tempDesc.length > 9) {
            tempDesc = tempDesc.join(' ');
        } else {
            tempDesc = description;
        }
        setDescPreview(tempDesc);
    }, [description]);

    return (
        <CardActionArea>
            <CardContent>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="h5" component="h2">{title}</Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        <Typography>{descPreview}</Typography>
                    </Grid>
                    <Grid container item xs={12} alignItems="center">
                        <Grid item xs={8}>
                            <Typography variant="body2" color="textSecondary"
                                        component="p">{moment(date).format(dateTimeFormat)}</Typography>
                        </Grid>
                        <Grid container item xs={4} justify="flex-end">
                            <Typography variant="body2" color="textSecondary"
                                        component="p">{`${price} £`}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </CardActionArea>
    );
}
