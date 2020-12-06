import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    text: {
        fontSize: 16,
        color: 'green'
    },
});

export default function SuccessMessage(props) {
    const { message } = props;
    const classes = useStyles();

    return (
        <Grid container item xs={12}>
            <Typography className={classes.text}>
                {message}
            </Typography>
        </Grid>
    )
}

SuccessMessage.defaultProps = {
    message: "Your requesy successfully completed",
};

SuccessMessage.propTypes = {
    message: PropTypes.string,
};
