import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    text: {
        fontSize: 14,
    },
});

export default function ErrorTextDisplay(props) {
    const { text, textColor } = props;
    const classes = useStyles();
    if (!text || text === '') {
        return null;
    }
    return (
        <Grid item xs={12}>
            <Typography
                id={text}
                data-testid={text}
                className={classes.text}
                style={{ color: textColor }}
            >
                {text}
            </Typography>
        </Grid>
    )
}

ErrorTextDisplay.defaultProps = {
    text: "",
    textColor: 'red'
};

ErrorTextDisplay.propTypes = {
    text: PropTypes.string,
    textColor: PropTypes.string
};
