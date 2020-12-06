import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useAuthContext } from "../../context/AuthContext";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        backgroundColor: '#e3f2fd',
    },
});

export default function EventCard(props) {
    const classes = useStyles();
    const { event, handleEditEvent, handleBookEvent } = props;
    const { userId } = useAuthContext();

    const [descPreview, setDescPreview] = useState([]);
    const { title, price, description, date, creator } = event || {};
    const { _id: creatorId } = creator || {}

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
        <Card className={classes.root}>
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
                                            component="p">{moment(date).format("dd, MMM Do YYYY, h:mm a")}</Typography>
                            </Grid>
                            <Grid container item xs={4} justify="flex-end">
                                <Typography variant="body2" color="textSecondary"
                                            component="p">{`${price} £`}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {creatorId !== userId ?
                    <Button size="small" color="primary" onClick={() => handleBookEvent(event._id)}>Book</Button>
                    :
                    <Button onClick={() => handleEditEvent(event)} size="small" color="primary">Edit</Button>
                }
            </CardActions>
        </Card>
    );
}