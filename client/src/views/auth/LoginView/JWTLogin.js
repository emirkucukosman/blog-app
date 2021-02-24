import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { login } from '../../../actions/authActions'
import { Formik } from 'formik';
import {
    Box,
    Button,
    FormHelperText,
    TextField,
    makeStyles
} from '@material-ui/core';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

const useStyles = makeStyles(() => ({
    root: {}
}));

const JWTLogin = ({ className, login, ...rest }) => {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string().max(255).required('Username is required'),
                password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values, {
                setErrors,
                setStatus,
                setSubmitting
            }) => {
                try {
                    await login(values.username, values.password);

                    if (isMountedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                    }
                } catch (err) {
                    if (isMountedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: (err.response && err.response.data.message) || "Unexpected error has occured" });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
            }) => (
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className={clsx(classes.root, className)}
                    {...rest}
                >
                    <TextField
                        error={Boolean(touched.username && errors.username)}
                        fullWidth
                        autoFocus
                        helperText={touched.username && errors.username}
                        label="Username"
                        margin="normal"
                        name="username"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.username}
                        variant="outlined"
                    />
                    <TextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
                        label="Password"
                        margin="normal"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                        variant="outlined"
                    />
                    {errors.submit && (
                        <Box mt={2}>
                            <FormHelperText error style={{ fontSize: ".975rem" }}>
                                {errors.submit}
                            </FormHelperText>
                        </Box>
                    )}
                    <Box mt={2}>
                        <Button
                            color="primary"
                            disabled={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Log In
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

JWTLogin.propTypes = {
    className: PropTypes.string,
};

export default connect(
    null, { login }
)(JWTLogin);