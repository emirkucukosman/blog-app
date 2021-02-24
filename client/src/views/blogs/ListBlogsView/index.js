import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getBlogs } from '../../../actions/blogActions'
import { clearErrors } from '../../../actions/errorActions'
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

const ListBlogsView = ({ blog, error, getBlogs, clearErrors }) => {
    const classes = useStyles();

    useEffect(() => {
        getBlogs();
    }, [getBlogs]);

    return (
        <Page
            className={classes.root}
            title="Browse Blogs"
        >
            <Container maxWidth={false}>
                <Header />
                <Box mt={3}>
                    <Results 
                        blogs={blog.blogs} 
                        blogsLoading={blog.isBlogsLoading} 
                        error={error}
                        clearErrors={clearErrors}
                    />
                </Box>
            </Container>
        </Page>
    );
};

const mapStateToProps = (state) => ({
    blog: state.blog,
    error: state.error
})

export default connect(
    mapStateToProps, { getBlogs, clearErrors }
)(ListBlogsView);