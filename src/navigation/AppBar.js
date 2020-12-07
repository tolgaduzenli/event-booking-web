import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import { useAuthContext } from '../context/AuthContext';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        }
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const { isTokenValid } = useAuthContext();

    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container alignItems="center" justify="space-between">
                    <Grid container item xs={2}>
                        <Typography variant="h4" className={classes.title}>EasyEvent</Typography>
                    </Grid>
                    <Grid container item xs={10} justify="flex-end">
                        <Grid item xs={2} xl={1}>
                            <NavLink to="/events" className={classes.link}>Events</NavLink>
                        </Grid>
                        {isTokenValid &&
                            <Grid item xs={2} xl={1}>
                                <NavLink to="/bookings" className={classes.link}>Bookings</NavLink>
                            </Grid>
                        }
                        {isTokenValid &&
                            <Grid container item xs={2} xl={1} justify="flex-end">
                                <NavLink to="/logout" className={classes.link}>
                                    <ExitToAppIcon/>
                                </NavLink>
                            </Grid>
                        }
                        {!isTokenValid &&
                            <Grid item xs={2}>
                                <NavLink to="/auth" className={classes.link}>Sign In / Sign Up</NavLink>
                            </Grid>
                        }
                    </Grid>
                </Grid>

            </Toolbar>
        </AppBar>
    );
}
