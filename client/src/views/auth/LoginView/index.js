import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Container,
    Typography,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import JWTLogin from './JWTLogin';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    cardContainer: {
        paddingBottom: 80,
        paddingTop: 80,
    },
    cardContent: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        minHeight: 400
    },
}));

const LoginView = () => {
    const classes = useStyles();

    return (
        <Page
            className={classes.root}
            title="Log In"
        >
            <Container
                className={classes.cardContainer}
                maxWidth="sm"
            >
                <Card>
                    <CardContent className={classes.cardContent}>
                        <div>
                            <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="h2"
                            >
                                Log In
                            </Typography>
                        </div>
                        <Box
                            flexGrow={1}
                            mt={3}
                        >
                            <JWTLogin />
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Page>
    );
};

export default LoginView;