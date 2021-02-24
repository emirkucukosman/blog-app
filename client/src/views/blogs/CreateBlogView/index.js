import React from 'react';
import {
    Box,
    Container,
    makeStyles,
    Typography,
} from '@material-ui/core';
import Page from '../../../components/Page';
import Form from './Form'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
    stepButtons: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    },
    prices: {
        margin: theme.spacing(2)
    }
}));

const CreateBlogView = () => {
    const classes = useStyles();

    return (
        <Page
            className={classes.root}
            title="Create Blog"
        >
            <Container maxWidth={false}>
                <Box mt={3}>
                    <Typography variant="h3" color="textPrimary">
                        Create Blog
                    </Typography>
                </Box>
                <Box mt={3}>
                    <Form />
                </Box>
            </Container>
        </Page>
    )
}

export default CreateBlogView;