import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    text: {
        fontSize: 16,
    },
    icon: {
        color: 'orange',
        fontSize: 46
    }
});

export default function DataNotFoundMessage(props) {
    const { message } = props;
    const classes = useStyles();

    return (
        <Grid container item xs={12} justify="center" alignItems="center" direction="column">
            <FindInPageIcon className={classes.icon} />
            <Typography className={classes.text}>
                {message}
            </Typography>
        </Grid>
    )
}

DataNotFoundMessage.defaultProps = {
    message: "Data not fount",
};

DataNotFoundMessage.propTypes = {
    message: PropTypes.string,
};
