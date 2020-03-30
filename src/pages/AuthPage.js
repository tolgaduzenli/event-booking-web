import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

export default function AuthPage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`nav-tabpanel-${index}`}
                aria-labelledby={`nav-tab-${index}`}
                {...other}
            >
                {value === index && <Box p={3}>{children}</Box>}
            </Typography>
        );
    }
    return (
        <Grid container>
            <Grid item xs={12}>
                <br />
                <br />
                <br />
            </Grid>
            <Grid container item xs={12} justify="center">
                <Paper>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        centered
                    >
                        <Tab label="Sign In" />
                        <Tab label="Sign Up" />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <SignIn />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SignUp switchToSignIn={handleChange} />
                    </TabPanel>
                </Paper>
            </Grid>
        </Grid>
    );
}