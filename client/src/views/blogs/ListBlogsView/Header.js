import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Breadcrumbs,
    Button,
    Grid,
    Link,
    SvgIcon,
    Typography,
    makeStyles
} from '@material-ui/core';
import { PlusCircle as PlusCircleIcon } from 'react-feather';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
    root: {},
    action: {
        marginBottom: theme.spacing(1),
        '& + &': {
            marginLeft: theme.spacing(1)
        }
    }
}));

const Header = ({ className, ...rest }) => {
    const classes = useStyles();

    return (
        <Grid
            container
            spacing={3}
            justify="space-between"
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Grid item>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    style={{ marginBottom: "1rem" }}
                >
                    <Link
                        variant="body1"
                        color="inherit"
                        to="/blogs/browse"
                        component={RouterLink}
                    >
                        Dashboard
                    </Link>
                    <Typography
                        variant="body1"
                        color="textPrimary"
                    >
                        Blogs
                    </Typography>
                </Breadcrumbs>
                <Typography
                    variant="h3"
                    color="textPrimary"
                >
                    All Blogs
                </Typography>
            </Grid>
            <Grid item>
                <Link
                    to="/blogs/create"
                    component={RouterLink}
                    underline="none"
                >
                    <Button                                            
                        color="secondary"
                        variant="contained"
                        className={classes.action}
                        startIcon={
                            <SvgIcon fontSize="small">
                                <PlusCircleIcon />
                            </SvgIcon>
                        }
                    >
                        CREATE BLOG
                    </Button>
                </Link>
            </Grid>
        </Grid>
    );
};

Header.propTypes = {
    className: PropTypes.string
};

export default Header;