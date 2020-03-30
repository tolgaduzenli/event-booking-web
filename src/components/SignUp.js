import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { apiCall } from '../Utils/ApiCalls';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        color: '#ff0000',
    },
}));

export default function SignUp(props) {
    const { switchToSignIn } = props;
    const classes = useStyles();
    const [error, setError] = useState();

    const submitHandler = (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const surname = event.target.elements.surname.value;
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;

        if (name.trim().length === 0 || surname.trim().length === 0
            || email.trim().length === 0 || password.trim().length === 0) {
            setError('Please fill required fields!');
            return;
        } else {
            setError();
            let requestBody = {
                query: `
                  mutation createUser($name: String!, $surname: String!, $email: String!, $password: String!) {
                    createUser(userInput: {name: $name, surname: $surname, email: $email, password: $password}) {
                      _id
                    }
                  }
                `,
                variables: {
                    name: name,
                    surname: surname,
                    email: email,
                    password: password
                }
            };
            apiCall(requestBody)
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) {
                        setError('Signup Failed! Please try again later');
                    } else if (res.data.errors) {
                        const messages = res.data.errors.map(err => err.message);
                        setError(messages.join(','));
                    } else if (res.data.data.createUser) {
                        switchToSignIn(null, 0)// switch auth view to sign in
                        setError();
                    }
                })
                .catch(err => {
                    console.log(err);
                    setError('Signup Failed! Please try again later');
                });
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <form className={classes.form} noValidate onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="surname"
                                label="Last Name"
                                name="surname"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                </form>
                <Typography className={classes.error}>{error}</Typography>
            </div>
        </Container>
    );
}