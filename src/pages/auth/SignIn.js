import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { apiCall } from '../../Utils/ApiCalls';
import { setTokenToCookie } from '../../Utils/SessionManager';
import { useAuthContext } from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
    paper: {
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        color: '#ff0000',
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [error, setError] = useState();
    const { setTokenValid, setToken, setUserId } = useAuthContext();

    const submitHandler = (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            setError('Please fill required fields!');
            setTokenValid(false);
            setToken()
            setUserId()
            return;
        } else {
            setError();
            let requestBody = {
                query: `
                  query Login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                      userId
                      token
                      tokenExpiration
                    }
                  }
                `,
                variables: {
                    email: email,
                    password: password
                }
            };
            apiCall(requestBody)
            .then(res => {
                if (res && res.status !== 200 && res.status !== 201) {
                    setError('Login Failed! Incorrect credentials');
                    setTokenValid(false);
                    setToken()
                    setUserId()
                } else if (res && res.data && res.data.data.login.token) {
                    setTokenToCookie({
                        token: res.data.data.login.token,
                        userId: res.data.data.login.userId,
                        expiration: res.data.data.login.tokenExpiration
                    });
                    setTokenValid(true);
                    setToken(res.data.data.login.token)
                    setUserId(res.data.data.login.userId)
                }
            })
            .catch(err => {
                console.log(err);
                setTokenValid(false);
                setToken()
                setUserId()
                setError('Login Failed! Please try again later');
            });
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <form className={classes.form} noValidate onSubmit={submitHandler}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
                <Typography className={classes.error}>{error}</Typography>
            </div>
        </Container>
    );
}
