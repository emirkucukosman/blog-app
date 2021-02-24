import React, {
    useRef,
    useState
} from 'react';
import { connect } from 'react-redux'
import { logout } from '../../../actions/authActions'
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
    Avatar,
    Box,
    ButtonBase,
    Menu,
    MenuItem,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    avatar: {
        height: 32,
        width: 32,
        marginRight: theme.spacing(1)
    },
    popover: {
        width: 200
    }
}));

const Account = ({ logout }) => {
    const classes = useStyles();
    const history = useHistory();
    const ref = useRef(null);
    const { enqueueSnackbar } = useSnackbar();
    const [isOpen, setOpen] = useState(false);
    const user = {
        name: 'emir'
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = async () => {
        try {
            handleClose();
            await logout();
            history.push('/');
        } catch (err) {
            console.error(err);
            enqueueSnackbar('Error logging out', {
                variant: 'error'
            });
        }
    };

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                component={ButtonBase}
                onClick={handleOpen}
                ref={ref}
            >
                <Avatar
                    alt="User"
                    className={classes.avatar}
                    src={user.avatar}
                />
            </Box>
            <Menu
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                keepMounted
                PaperProps={{ className: classes.popover }}
                getContentAnchorEl={null}
                anchorEl={ref.current}
                open={isOpen}
            >
                <MenuItem onClick={handleLogout}>
                    Log Out
                </MenuItem>
            </Menu>
        </>
    );
}

export default connect(
    null, { logout }
)(Account);