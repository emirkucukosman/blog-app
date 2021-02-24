import React, { useEffect } from 'react';
import moment from 'moment'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack'
import { Card, Box, Backdrop, CircularProgress, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {},
    card: {
        width: "100%",
        marginTop: theme.spacing(3)
    },
    helper: {
        color: theme.palette.error.main
    }    
}));

const Results = ({ className, blogs, error, blogsLoading, clearErrors, ...rest }) => {
    const classes = useStyles();
    const { enqueueSnackbar }  = useSnackbar();

    useEffect(() => {
        if (error.id === "GET_BLOGS_FAIL") {
            enqueueSnackbar(error.message, { variant: 'error' })
            clearErrors();
        }
    }, [error.id, error.message])

    return (
        <div
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Backdrop open={blogsLoading} style={{ zIndex: 999 }}>
                <CircularProgress />
            </Backdrop>
            {blogs.length !== 0 ? (
                blogs.map((blog, i) => (
                    <Card key={i} elevation={2} className={classes.card}>
                        <CardHeader title={blog.title} />
                        <CardContent>
                            {blog.body}
                            <Box mt={1} display="flex" flexDirection="row" justifyContent="flex-end" width="100%">
                                <Typography
                                    color="textSecondary"
                                    variant="small"
                                >   
                                    {blog.author} - {moment(blog.createdAt).format('DD.MM.YYYY | HH:mm')}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography 
                    variant="body1"
                    className={classes.helper}
                >
                    No blogs were found
                </Typography>
            )}
        </div>
    );
};

Results.propTypes = {
    className: PropTypes.string,
    blogs: PropTypes.array.isRequired,
    blogsLoading: PropTypes.bool.isRequired,
};

Results.defaultProps = {
    blogs: []
};

export default Results;